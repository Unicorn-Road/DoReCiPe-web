import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!credentialsJson || !propertyId) {
      console.error('Google Analytics credentials not configured');
      // Return mock data if credentials not set
      return NextResponse.json({
        pageviews: 0,
        users: 0,
        sessions: 0,
        bounceRate: 0,
      });
    }

    const credentials = JSON.parse(credentialsJson);
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    });

    // Fetch analytics data for the last 30 days
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'bounceRate' },
      ],
    });

    const row = response.rows?.[0];
    const metrics = row?.metricValues || [];

    return NextResponse.json({
      pageviews: parseInt(metrics[0]?.value || '0'),
      users: parseInt(metrics[1]?.value || '0'),
      sessions: parseInt(metrics[2]?.value || '0'),
      bounceRate: parseFloat(metrics[3]?.value || '0') * 100,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
