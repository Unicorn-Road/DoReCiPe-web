import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAppStoreStats, getAppStoreReviews } from '@/lib/appstore';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if App Store credentials are configured
    if (!process.env.APPSTORE_ISSUER_ID || !process.env.APPSTORE_KEY_ID || !process.env.APPSTORE_PRIVATE_KEY) {
      return NextResponse.json({
        configured: false,
        message: 'App Store Connect API credentials not configured',
        stats: {
          downloads: { total: 0, today: 0, last7Days: 0, last30Days: 0 },
          revenue: { total: 0, today: 0, last7Days: 0, last30Days: 0, app: 0, subscription: 0 },
          subscriptions: { active: 0, mrr: 0 },
          ratings: {
            average: 0,
            count: 0,
            distribution: { oneStar: 0, twoStar: 0, threeStar: 0, fourStar: 0, fiveStar: 0 },
          },
          updates: { currentVersion: 'N/A', adoptionRate: 0 },
          crashes: { count: 0, crashFreeRate: 100 },
        },
        reviews: [],
      });
    }

    // Fetch stats and reviews
    const [stats, reviews] = await Promise.all([
      getAppStoreStats(),
      getAppStoreReviews(5),
    ]);

    return NextResponse.json({
      configured: true,
      stats: stats || {
        downloads: { total: 0, today: 0, last7Days: 0, last30Days: 0 },
        revenue: { total: 0, today: 0, last7Days: 0, last30Days: 0, app: 0, subscription: 0 },
        subscriptions: { active: 0, mrr: 0 },
        ratings: {
          average: 0,
          count: 0,
          distribution: { oneStar: 0, twoStar: 0, threeStar: 0, fourStar: 0, fiveStar: 0 },
        },
        updates: { currentVersion: 'N/A', adoptionRate: 0 },
        crashes: { count: 0, crashFreeRate: 100 },
      },
      reviews: reviews || [],
    });
  } catch (error) {
    console.error('Error fetching App Store data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch App Store data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
