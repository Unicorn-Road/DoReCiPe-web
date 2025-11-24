import jwt from 'jsonwebtoken';
import axios from 'axios';

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

  const token = jwt.sign({}, formattedKey, {
    algorithm: 'ES256',
    expiresIn: '20m',
    issuer: issuerId,
    header: {
      alg: 'ES256',
      kid: keyId,
      typ: 'JWT',
    },
  });

  return token;
}

/**
 * Fetches app analytics from App Store Connect API
 */
export async function getAppStoreStats(): Promise<AppStoreStats | null> {
  try {
    const appId = process.env.APPSTORE_APP_ID || '6745566524';
    const token = generateAppStoreToken();

    // App Store Connect API endpoint
    const baseUrl = 'https://api.appstoreconnect.apple.com/v1';

    // Note: App Store Connect Analytics API requires app-level analytics to be enabled
    // and may have a delay in data availability (24-48 hours)

    // Fetch app info and ratings
    const appResponse = await axios.get(`${baseUrl}/apps/${appId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // For analytics data, you need to use the Analytics API
    // This requires the Sales and Trends report endpoint
    // Note: Detailed analytics may require the Reporter API or Analytics API

    // For now, return mock data structure with instructions
    // You'll need to implement specific Analytics API calls based on your needs
    const stats: AppStoreStats = {
      downloads: {
        total: 0,
        today: 0,
        last7Days: 0,
        last30Days: 0,
      },
      revenue: {
        total: 0,
        today: 0,
        last7Days: 0,
        last30Days: 0,
      },
      ratings: {
        average: 0,
        count: 0,
        distribution: {
          oneStar: 0,
          twoStar: 0,
          threeStar: 0,
          fourStar: 0,
          fiveStar: 0,
        },
      },
      updates: {
        currentVersion: appResponse.data.data.attributes?.versionString || '1.0.0',
        adoptionRate: 0,
      },
      crashes: {
        count: 0,
        crashFreeRate: 100,
      },
    };

    return stats;
  } catch (error) {
    console.error('Error fetching App Store stats:', error);
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
