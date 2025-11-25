import jwt from 'jsonwebtoken';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

interface AppStoreStats {
  downloads: {
    total: number;
    today: number;
    last7Days: number;
    last30Days: number;
  };
  revenue: {
    total: number;
    today: number;
    last7Days: number;
    last30Days: number;
    app: number; // App purchases only
    subscription: number; // Subscription revenue
  };
  subscriptions: {
    active: number;
    mrr: number;
  };
  ratings: {
    average: number;
    count: number;
    distribution: {
      oneStar: number;
      twoStar: number;
      threeStar: number;
      fourStar: number;
      fiveStar: number;
    };
  };
  updates: {
    currentVersion: string;
    adoptionRate: number;
  };
  crashes: {
    count: number;
    crashFreeRate: number;
  };
}

/**
 * Generates a JWT token for App Store Connect API authentication
 */
function generateAppStoreToken(): string {
  const issuerId = process.env.APPSTORE_ISSUER_ID;
  const keyId = process.env.APPSTORE_KEY_ID;
  const privateKey = process.env.APPSTORE_PRIVATE_KEY;

  if (!issuerId || !keyId || !privateKey) {
    throw new Error('App Store Connect credentials not configured');
  }

  // Format the private key properly (handle escaped newlines)
  const formattedKey = privateKey.replace(/\\n/g, '\n');

  const token = jwt.sign(
    {
      aud: 'appstoreconnect-v1',
    },
    formattedKey,
    {
      algorithm: 'ES256',
      expiresIn: '20m',
      issuer: issuerId,
      header: {
        alg: 'ES256',
        kid: keyId,
        typ: 'JWT',
      },
    }
  );

  return token;
}

/**
 * Fetch Sales Reports (downloads and revenue) for Do-Re-Ci-Pe
 * Fetches last 30 days only for performance (all-time calculated separately)
 */
async function fetchSalesReports(token: string): Promise<{
  downloads: { total: number; today: number; last7Days: number; last30Days: number };
  revenue: { total: number; today: number; last7Days: number; last30Days: number };
}> {
  const vendor = process.env.APPSTORE_VENDOR_NUMBER;
  const TARGET_SKU = 'com.seahostler.dorecipe'; // Do-Re-Ci-Pe SKU
  
  if (!vendor) {
    console.log('[AppStore] No vendor number configured');
    return {
      downloads: { total: 0, today: 0, last7Days: 0, last30Days: 0 },
      revenue: { total: 0, today: 0, last7Days: 0, last30Days: 0 },
    };
  }

  const baseUrl = 'https://api.appstoreconnect.apple.com/v1';
  const totals = { 
    last7Days: { units: 0, revenue: 0 }, 
    last30Days: { units: 0, revenue: 0 } 
  };

  console.log('[AppStore] Fetching sales reports (last 30 days)...');

  // Fetch last 30 days only (skip today and yesterday due to reporting delay)
  for (let daysAgo = 2; daysAgo <= 30; daysAgo++) {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const reportDate = d.toISOString().split('T')[0];
    
    try {
      const res = await axios.get(`${baseUrl}/salesReports`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/a-gzip' },
        params: {
          'filter[frequency]': 'DAILY',
          'filter[reportSubType]': 'SUMMARY',
          'filter[reportType]': 'SALES',
          'filter[vendorNumber]': vendor,
          'filter[reportDate]': reportDate,
        },
        responseType: 'arraybuffer',
        timeout: 5000,
      });
      
      const data = zlib.gunzipSync(res.data).toString();
      const lines = data.split('\n').filter((l) => l.trim());
      
      // Parse rows for Do-Re-Ci-Pe only
      let dayUnits = 0;
      let dayRevenue = 0;
      
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split('\t');
        if (cols.length < 10) continue;
        
        const sku = cols[2];
        if (sku !== TARGET_SKU) continue; // Only count Do-Re-Ci-Pe
        
        const productType = cols[6];
        const units = parseInt(cols[7]) || 0;
        const revenue = parseFloat(cols[8]) || 0;
        
        // Only count 1F (new purchases) as downloads
        // 7F = updates/redownloads, 3F = in-app purchases
        if (productType === '1F') {
          dayUnits += units;
        }
        
        // Count all revenue regardless of type
        dayRevenue += revenue;
      }
      
      // Add to totals
      totals.last30Days.units += dayUnits;
      totals.last30Days.revenue += dayRevenue;
      
      if (daysAgo <= 8) { // Last 7 days
        totals.last7Days.units += dayUnits;
        totals.last7Days.revenue += dayRevenue;
      }
      
    } catch (err) {
      // Skip missing reports (likely no sales that day)
    }
  }

  console.log('[AppStore] Sales data (last 30d):', totals.last30Days.units, 'units, $' + totals.last30Days.revenue.toFixed(2));

  // For all-time totals, use cached values from manual query
  // Fetching 200+ days takes too long, so we cache these values
  // Updated: 2025-11-25
  const allTimeUnits = 56; // All-time 1F downloads
  const allTimeRevenue = 34.18; // All-time developer proceeds (after Apple's 30% cut)

  return {
    downloads: {
      total: allTimeUnits,
      today: 0,
      last7Days: totals.last7Days.units,
      last30Days: totals.last30Days.units,
    },
    revenue: {
      total: allTimeRevenue,
      today: 0,
      last7Days: totals.last7Days.revenue,
      last30Days: totals.last30Days.revenue,
    },
  };
}

/**
 * Fetch subscription data from RevenueCat
 */
async function fetchRevenueCatData(): Promise<{
  activeSubscriptions: number;
  mrr: number;
  revenue: number;
} | null> {
  const apiKey = process.env.REVENUECAT_API_KEY;
  
  if (!apiKey) {
    console.log('[RevenueCat] No API key configured');
    return null;
  }
  
  try {
    // Get project ID
    const projectsRes = await axios.get('https://api.revenuecat.com/v2/projects', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    
    const project = projectsRes.data.items?.[0];
    if (!project) {
      console.log('[RevenueCat] No projects found');
      return null;
    }
    
    console.log('[RevenueCat] Found project:', project.name);
    
    // Get overview metrics
    const metricsRes = await axios.get(
      `https://api.revenuecat.com/v2/projects/${project.id}/metrics/overview`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        params: {
          start_date: '2025-05-01',
          end_date: new Date().toISOString().split('T')[0],
        },
      }
    );
    
    const metrics = metricsRes.data.metrics || [];
    const activeSubscriptions = metrics.find((m: any) => m.id === 'active_subscriptions')?.value || 0;
    const mrr = metrics.find((m: any) => m.id === 'mrr')?.value || 0;
    const revenue = metrics.find((m: any) => m.id === 'revenue')?.value || 0;
    
    console.log('[RevenueCat] Metrics:', { activeSubscriptions, mrr, revenue });
    
    return { activeSubscriptions, mrr, revenue };
  } catch (error: any) {
    console.error('[RevenueCat] Error fetching data:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Fetches app analytics from App Store Connect API
 */
export async function getAppStoreStats(): Promise<AppStoreStats | null> {
  try {
    const appId = process.env.APPSTORE_APP_ID || '6745566524';
    const token = generateAppStoreToken();
    const baseUrl = 'https://api.appstoreconnect.apple.com/v1';

    console.log('[AppStore] Fetching data for app:', appId);

    // Fetch app info
    let currentVersion = '1.0.0';
    let ratingAverage = 0;
    let ratingCount = 0;
    
    try {
      const appResponse = await axios.get(`${baseUrl}/apps/${appId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      currentVersion = appResponse.data.data.attributes?.versionString || '1.0.0';
      console.log('[AppStore] App info fetched, version:', currentVersion);
    } catch (error: any) {
      console.error('[AppStore] Error fetching app info:', error.response?.data || error.message);
    }

    // Fetch sales data (downloads and revenue from Apple)
    const sales = await fetchSalesReports(token);
    
    // Fetch subscription data from RevenueCat
    const revenueCat = await fetchRevenueCatData();
    
    // Combine revenue: Apple app purchases + RevenueCat subscriptions
    const totalRevenue = sales.revenue.total + (revenueCat?.revenue || 0);
    
    const downloadStats = { 
      total: sales.downloads.total, 
      today: 0, 
      last7Days: sales.downloads.last7Days, 
      last30Days: sales.downloads.last30Days 
    };
    
    const revenueStats = { 
      total: totalRevenue, 
      today: 0, 
      last7Days: sales.revenue.last7Days, 
      last30Days: sales.revenue.last30Days + (revenueCat?.revenue || 0),
      app: sales.revenue.total,
      subscription: revenueCat?.revenue || 0,
    };

    // Fetch customer reviews summary (includes rating info)
    let ratingsDistribution = { oneStar: 0, twoStar: 0, threeStar: 0, fourStar: 0, fiveStar: 0 };
    
    try {
      const reviewsResponse = await axios.get(
        `${baseUrl}/apps/${appId}/customerReviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 200,
            sort: '-createdDate',
          },
        }
      );
      
      const reviews = reviewsResponse.data.data || [];
      console.log('[AppStore] Fetched', reviews.length, 'reviews');
      
      if (reviews.length > 0) {
        // Calculate average rating and distribution from reviews
        const ratings = reviews.map((r: any) => r.attributes?.rating || 0).filter((r: number) => r > 0);
        ratingAverage = ratings.length > 0 ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length : 0;
        ratingCount = ratings.length;
        
        // Calculate distribution
        ratings.forEach((rating: number) => {
          if (rating === 5) ratingsDistribution.fiveStar++;
          else if (rating === 4) ratingsDistribution.fourStar++;
          else if (rating === 3) ratingsDistribution.threeStar++;
          else if (rating === 2) ratingsDistribution.twoStar++;
          else if (rating === 1) ratingsDistribution.oneStar++;
        });
        
        console.log('[AppStore] Rating average:', ratingAverage.toFixed(2), 'from', ratingCount, 'reviews');
        console.log('[AppStore] Distribution:', JSON.stringify(ratingsDistribution));
      }
    } catch (error: any) {
      console.error('[AppStore] Error fetching reviews:', error.response?.data || error.message);
    }


    const stats: AppStoreStats = {
      downloads: downloadStats,
      revenue: revenueStats,
      subscriptions: {
        active: revenueCat?.activeSubscriptions || 0,
        mrr: revenueCat?.mrr || 0,
      },
      ratings: {
        average: ratingAverage,
        count: ratingCount,
        distribution: ratingsDistribution,
      },
      updates: {
        currentVersion,
        adoptionRate: 0,
      },
      crashes: {
        count: 0,
        crashFreeRate: 100,
      },
    };

    console.log('[AppStore] Final stats:', JSON.stringify(stats, null, 2));
    return stats;
  } catch (error: any) {
    console.error('[AppStore] Error fetching App Store stats:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Fetches sales and trends data (downloads, revenue)
 * Requires App Store Connect Reporter API credentials
 */
export async function getAppStoreSalesData(days: number = 30) {
  try {
    const token = generateAppStoreToken();
    
    // App Store Connect Sales and Trends API
    // This uses a different endpoint: https://reportingitc-reporter.apple.com/reportservice/sales/v1
    // For detailed implementation, see: https://developer.apple.com/documentation/appstoreconnectapi/sales_and_trends
    
    // You may need to use the Reporter tool or download reports
    // and process them separately
    
    return null;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return null;
  }
}

/**
 * Fetches customer reviews from App Store Connect
 */
export async function getAppStoreReviews(limit: number = 10) {
  try {
    const appId = process.env.APPSTORE_APP_ID || '6745566524';
    const token = generateAppStoreToken();
    const baseUrl = 'https://api.appstoreconnect.apple.com/v1';

    const response = await axios.get(
      `${baseUrl}/apps/${appId}/customerReviews`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit,
          sort: '-createdDate',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching App Store reviews:', error);
    return [];
  }
}
