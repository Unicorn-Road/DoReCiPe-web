'use client';

import { useEffect, useState } from 'react';

interface MarketingData {
  conversions: { downloads: number; featureViews: number };
  channels: { channel: string; sessions: number }[];
  devices: { device: string; users: number }[];
  userTypes: { new: number; returning: number };
  searchConsole: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    topQueries: { query: string; clicks: number; impressions: number }[];
  };
}

export default function MarketingDashboard() {
  const [data, setData] = useState<MarketingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics/enhanced')
      .then(res => res.json())
      .then(result => {
        if (!result.error) {
          setData(result);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-pantry-400">Loading marketing insights...</div>;
  }

  if (!data) {
    return <div className="text-pantry-400">Unable to load marketing data</div>;
  }

  const totalUsers = data.userTypes.new + data.userTypes.returning;
  const newUserPercent = totalUsers > 0 ? (data.userTypes.new / totalUsers) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Key Marketing Metrics - Highlighted */}
      <div className="bg-gradient-to-br from-apricot-500 to-coral-500 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6">🎯 Key Performance Indicators</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-sm opacity-90 mb-1">App Download Clicks</div>
            <div className="text-4xl font-bold">{data.conversions.downloads.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm opacity-90 mb-1">Search Impressions</div>
            <div className="text-4xl font-bold">{data.searchConsole.impressions.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm opacity-90 mb-1">Search Clicks</div>
            <div className="text-4xl font-bold">{data.searchConsole.clicks.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm opacity-90 mb-1">Avg. Search Position</div>
            <div className="text-4xl font-bold">{data.searchConsole.position > 0 ? data.searchConsole.position.toFixed(1) : 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Acquisition Channels */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
          <h3 className="text-lg font-bold text-pantry mb-4">📈 Top Acquisition Channels</h3>
          {data.channels.length > 0 ? (
            <div className="space-y-3">
              {data.channels.map((channel, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-pantry-600 capitalize">
                    {channel.channel}
                  </span>
                  <span className="text-sm font-bold text-pantry">
                    {channel.sessions.toLocaleString()} sessions
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-pantry-400 text-sm">No data yet</div>
          )}
        </div>

        {/* New vs Returning Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
          <h3 className="text-lg font-bold text-pantry mb-4">👥 User Acquisition</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-pantry-600">New Users</span>
                <span className="font-bold text-pantry">{data.userTypes.new.toLocaleString()} ({newUserPercent.toFixed(0)}%)</span>
              </div>
              <div className="h-3 bg-cream-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-apricot-500 rounded-full"
                  style={{ width: `${newUserPercent}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-pantry-600">Returning Users</span>
                <span className="font-bold text-pantry">{data.userTypes.returning.toLocaleString()} ({(100 - newUserPercent).toFixed(0)}%)</span>
              </div>
              <div className="h-3 bg-cream-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-coral-500 rounded-full"
                  style={{ width: `${100 - newUserPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
        <h3 className="text-lg font-bold text-pantry mb-4">🔍 Top Search Queries (SEO)</h3>
        {data.searchConsole.topQueries.length > 0 ? (
          <div className="space-y-3">
            {data.searchConsole.topQueries.map((query, i) => (
              <div key={i} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-pantry-600">{query.query}</div>
                  <div className="text-xs text-pantry-400">
                    {query.impressions.toLocaleString()} impressions
                  </div>
                </div>
                <div className="text-sm font-bold text-apricot-600">
                  {query.clicks} clicks
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-pantry-400 text-sm">
            No search data yet. Make sure site is verified in Google Search Console.
          </div>
        )}
      </div>

      {/* Device Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
        <h3 className="text-lg font-bold text-pantry mb-4">📱 Device Breakdown</h3>
        {data.devices.length > 0 ? (
          <div className="flex gap-4">
            {data.devices.map((device, i) => {
              const totalDeviceUsers = data.devices.reduce((sum, d) => sum + d.users, 0);
              const percent = totalDeviceUsers > 0 ? (device.users / totalDeviceUsers) * 100 : 0;
              return (
                <div key={i} className="flex-1 text-center">
                  <div className="text-3xl mb-2">
                    {device.device === 'mobile' ? '📱' : device.device === 'desktop' ? '💻' : '📺'}
                  </div>
                  <div className="text-sm font-semibold text-pantry-600 capitalize mb-1">
                    {device.device}
                  </div>
                  <div className="text-2xl font-bold text-pantry mb-1">
                    {device.users.toLocaleString()}
                  </div>
                  <div className="text-xs text-pantry-400">{percent.toFixed(0)}%</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-pantry-400 text-sm">No device data yet</div>
        )}
      </div>
    </div>
  );
}
