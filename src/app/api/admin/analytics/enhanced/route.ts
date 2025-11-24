import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from 'googleapis';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!credentialsJson || !propertyId) {
      return NextResponse.json({
        conversions: { downloads: 0, featureViews: 0 },
        channels: [],
        devices: [],
        userTypes: { new: 0, returning: 0 },
        searchConsole: { clicks: 0, impressions: 0, ctr: 0, position: 0, topQueries: [] },
      });
    }

    const credentials = JSON.parse(credentialsJson);
    const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

    // Fetch conversion events (app downloads, feature views)
    const [conversionsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: {
            values: ['download_click', 'feature_view', 'cta_click'],
          },
        },
      },
    });

    // Fetch traffic by channel
    const [channelsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 5,
    });

    // Fetch device breakdown
    const [devicesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'activeUsers' }],
    });

    // Fetch new vs returning
    const [userTypesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'newVsReturning' }],
      metrics: [{ name: 'activeUsers' }],
    });

    // Google Search Console data
    let searchConsoleData = {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
      topQueries: [] as { query: string; clicks: number; impressions: number }[],
    };

    try {
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
      const searchConsole = google.webmasters({ version: 'v3', auth });

      const gscResponse = await searchConsole.searchanalytics.query({
        siteUrl: 'sc-domain:dorecipe.app',
        requestBody: {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
          dimensions: ['query'],
          rowLimit: 5,
        },
      });

      const gscRows = gscResponse.data.rows || [];
      searchConsoleData = {
        clicks: gscRows.reduce((sum, row) => sum + (row.clicks || 0), 0),
        impressions: gscRows.reduce((sum, row) => sum + (row.impressions || 0), 0),
        ctr: gscRows.length > 0
          ? gscRows.reduce((sum, row) => sum + (row.ctr || 0), 0) / gscRows.length
          : 0,
        position: gscRows.length > 0
          ? gscRows.reduce((sum, row) => sum + (row.position || 0), 0) / gscRows.length
          : 0,
        topQueries: gscRows.map(row => ({
          query: row.keys?.[0] || '',
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
        })),
      };
    } catch (gscError) {
      console.error('GSC error (non-fatal):', gscError);
    }

    // Parse conversion events
    const conversionEvents = conversionsResponse.rows || [];
    const conversions = {
      downloads: conversionEvents.find(r => r.dimensionValues?.[0]?.value === 'download_click')
        ?.metricValues?.[0]?.value || '0',
      featureViews: conversionEvents.find(r => r.dimensionValues?.[0]?.value === 'feature_view')
        ?.metricValues?.[0]?.value || '0',
    };

    return NextResponse.json({
      conversions: {
        downloads: parseInt(conversions.downloads),
        featureViews: parseInt(conversions.featureViews),
      },
      channels: channelsResponse.rows?.map(row => ({
        channel: row.dimensionValues?.[0]?.value || '',
        sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || [],
      devices: devicesResponse.rows?.map(row => ({
        device: row.dimensionValues?.[0]?.value || '',
        users: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || [],
      userTypes: {
        new: parseInt(
          userTypesResponse.rows?.find(r => r.dimensionValues?.[0]?.value === 'new')
            ?.metricValues?.[0]?.value || '0'
        ),
        returning: parseInt(
          userTypesResponse.rows?.find(r => r.dimensionValues?.[0]?.value === 'returning')
            ?.metricValues?.[0]?.value || '0'
        ),
      },
      searchConsole: searchConsoleData,
    });
  } catch (error) {
    console.error('Enhanced analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
