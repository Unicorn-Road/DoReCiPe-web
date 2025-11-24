import jwt from 'jsonwebtoken';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

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

    // Download and revenue data not available via standard API
    const downloadStats = { total: 0, today: 0, last7Days: 0, last30Days: 0 };
    const revenueStats = { total: 0, today: 0, last7Days: 0, last30Days: 0 };

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
