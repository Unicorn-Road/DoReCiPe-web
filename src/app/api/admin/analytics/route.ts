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
      // Return empty data if credentials not set
      return NextResponse.json({
        pageviews: 0,
        users: 0,
        sessions: 0,
        bounceRate: 0,
        topPages: [],
        topSources: [],
        dailyTrend: [],
      });
    }

    const credentials = JSON.parse(credentialsJson);
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials,
    });

    // Fetch overview stats
    const [overviewResponse] = await analyticsDataClient.runReport({
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

    // Fetch top pages
    const [topPagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 5,
    });

    // Fetch traffic sources
    const [sourcesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'sessionSource' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 5,
    });

    // Fetch daily trend (last 7 days)
    const [trendResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    const overviewRow = overviewResponse.rows?.[0];
    const overviewMetrics = overviewRow?.metricValues || [];

    return NextResponse.json({
      pageviews: parseInt(overviewMetrics[0]?.value || '0'),
      users: parseInt(overviewMetrics[1]?.value || '0'),
      sessions: parseInt(overviewMetrics[2]?.value || '0'),
      bounceRate: parseFloat(overviewMetrics[3]?.value || '0') * 100,
      topPages: topPagesResponse.rows?.map(row => ({
        path: row.dimensionValues?.[0]?.value || '',
        views: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || [],
      topSources: sourcesResponse.rows?.map(row => ({
        source: row.dimensionValues?.[0]?.value || '',
        sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || [],
      dailyTrend: trendResponse.rows?.map(row => ({
        date: row.dimensionValues?.[0]?.value || '',
        users: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || [],
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
