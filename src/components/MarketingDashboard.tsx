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
    <div className="space-y-8">
      {/* Key Marketing Metrics - Highlighted */}
      <div className="bg-pantry rounded-2xl p-10 text-white shadow-xl">
        <h2 className="text-xl font-bold mb-8 text-cream-50 uppercase tracking-wide">🎯 Key Performance Indicators</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-cream-200 uppercase tracking-wider">App Downloads</div>
            <div className="text-5xl font-bold text-white">{data.conversions.downloads.toLocaleString()}</div>
            <div className="text-sm text-apricot-200">Clicks on download buttons</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-cream-200 uppercase tracking-wider">Search Impressions</div>
            <div className="text-5xl font-bold text-white">{data.searchConsole.impressions.toLocaleString()}</div>
            <div className="text-sm text-apricot-200">Times shown in search</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-cream-200 uppercase tracking-wider">Search Clicks</div>
            <div className="text-5xl font-bold text-white">{data.searchConsole.clicks.toLocaleString()}</div>
            <div className="text-sm text-apricot-200">Organic traffic from Google</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-cream-200 uppercase tracking-wider">Avg. Position</div>
            <div className="text-5xl font-bold text-white">{data.searchConsole.position > 0 ? data.searchConsole.position.toFixed(1) : 'N/A'}</div>
            <div className="text-sm text-apricot-200">Search result ranking</div>
          </div>
        </div>
      </div>

      {/* Acquisition Channels */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow-md border border-cream-200">
          <h3 className="text-base font-bold text-pantry mb-6 uppercase tracking-wide">📈 Top Channels</h3>
          {data.channels.length > 0 ? (
            <div className="space-y-4">
              {data.channels.map((channel, i) => (
                <div key={i} className="flex justify-between items-center pb-3 border-b border-cream-100 last:border-0">
                  <span className="text-base font-medium text-pantry capitalize">
                    {channel.channel}
                  </span>
                  <span className="text-lg font-bold text-pantry">
                    {channel.sessions.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-pantry-400">No data yet</div>
          )}
        </div>

        {/* New vs Returning Users */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-cream-200">
          <h3 className="text-base font-bold text-pantry mb-6 uppercase tracking-wide">👥 User Types</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-base font-medium text-pantry">New Users</span>
                <span className="text-lg font-bold text-pantry">{data.userTypes.new.toLocaleString()}</span>
              </div>
              <div className="h-4 bg-cream-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-apricot-500 rounded-full transition-all"
                  style={{ width: `${newUserPercent}%` }}
                />
              </div>
              <div className="text-xs text-pantry-400 mt-1">{newUserPercent.toFixed(0)}% of total</div>
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-base font-medium text-pantry">Returning Users</span>
                <span className="text-lg font-bold text-pantry">{data.userTypes.returning.toLocaleString()}</span>
              </div>
              <div className="h-4 bg-cream-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-coral-500 rounded-full transition-all"
                  style={{ width: `${100 - newUserPercent}%` }}
                />
              </div>
              <div className="text-xs text-pantry-400 mt-1">{(100 - newUserPercent).toFixed(0)}% of total</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Performance & Devices Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* SEO Performance - takes 2 columns */}
        <div className="md:col-span-2 bg-white rounded-xl p-8 shadow-md border border-cream-200">
          <h3 className="text-base font-bold text-pantry mb-6 uppercase tracking-wide">🔍 Top Search Queries</h3>
          {data.searchConsole.topQueries.length > 0 ? (
            <div className="space-y-4">
              {data.searchConsole.topQueries.map((query, i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-cream-100 last:border-0">
                  <div className="flex-1 mr-6">
                    <div className="text-base font-medium text-pantry mb-1">{query.query}</div>
                    <div className="text-sm text-pantry-400">
                      {query.impressions.toLocaleString()} impressions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-apricot-600">{query.clicks}</div>
                    <div className="text-xs text-pantry-400">clicks</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-pantry-400 py-8 text-center">
              No search data yet. Site verification may take 24-48 hours.
            </div>
          )}
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-cream-200">
          <h3 className="text-base font-bold text-pantry mb-6 uppercase tracking-wide">📱 Devices</h3>
          {data.devices.length > 0 ? (
            <div className="space-y-6">
              {data.devices.map((device, i) => {
                const totalDeviceUsers = data.devices.reduce((sum, d) => sum + d.users, 0);
                const percent = totalDeviceUsers > 0 ? (device.users / totalDeviceUsers) * 100 : 0;
                return (
                  <div key={i} className="text-center">
                    <div className="text-4xl mb-3">
                      {device.device === 'mobile' ? '📱' : device.device === 'desktop' ? '💻' : '📺'}
                    </div>
                    <div className="text-sm font-medium text-pantry-600 capitalize mb-2">
                      {device.device}
                    </div>
                    <div className="text-3xl font-bold text-pantry mb-1">
                      {device.users.toLocaleString()}
                    </div>
                    <div className="text-sm text-pantry-400">{percent.toFixed(0)}%</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-pantry-400">No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
