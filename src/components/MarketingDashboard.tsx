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

interface AppStoreData {
  configured: boolean;
  message?: string;
  stats: {
    downloads: { total: number; today: number; last7Days: number; last30Days: number };
    revenue: { total: number; today: number; last7Days: number; last30Days: number; app: number; subscription: number };
    subscriptions: { active: number; mrr: number };
    ratings: {
      average: number;
      count: number;
      distribution: { oneStar: number; twoStar: number; threeStar: number; fourStar: number; fiveStar: number };
    };
    updates: { currentVersion: string; adoptionRate: number };
    crashes: { count: number; crashFreeRate: number };
  };
  reviews: any[];
}

export default function MarketingDashboard() {
  const [data, setData] = useState<MarketingData | null>(null);
  const [appStoreData, setAppStoreData] = useState<AppStoreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch both web analytics and App Store data
    Promise.all([
      fetch('/api/admin/analytics/enhanced').then(res => res.json()),
      fetch('/api/admin/appstore').then(res => res.json()),
    ])
      .then(([analyticsResult, appStoreResult]) => {
        if (!analyticsResult.error) {
          setData(analyticsResult);
        }
        if (!appStoreResult.error) {
          setAppStoreData(appStoreResult);
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

      {/* App Store Metrics */}
      {appStoreData && (
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-10 text-white shadow-xl">
          <h2 className="text-xl font-bold mb-8 text-white uppercase tracking-wide flex items-center gap-3">
            <span>📱</span> App Store Performance
          </h2>
          
          {!appStoreData.configured && (
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
              <p className="text-sm text-white/90">
                {appStoreData.message || 'Configure App Store Connect API to see metrics here.'}
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">Total Downloads</div>
              <div className="text-4xl font-bold text-white">{appStoreData.stats.downloads.total.toLocaleString()}</div>
              <div className="text-sm text-white/70">All time (1F only)</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">Rating</div>
              <div className="text-4xl font-bold text-white">
                {appStoreData.stats.ratings.average > 0 ? appStoreData.stats.ratings.average.toFixed(1) : 'N/A'}
              </div>
              <div className="text-sm text-white/70">{appStoreData.stats.ratings.count.toLocaleString()} reviews</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">Total Revenue</div>
              <div className="text-4xl font-bold text-white">
                ${appStoreData.stats.revenue.total.toFixed(0)}
              </div>
              <div className="text-sm text-white/70">All time (app + subs)</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">Active Subs</div>
              <div className="text-4xl font-bold text-white">{appStoreData.stats.subscriptions.active}</div>
              <div className="text-sm text-white/70">${appStoreData.stats.subscriptions.mrr}/mo MRR</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">Crash-Free</div>
              <div className="text-4xl font-bold text-white">{appStoreData.stats.crashes.crashFreeRate.toFixed(1)}%</div>
              <div className="text-sm text-white/70">v{appStoreData.stats.updates.currentVersion}</div>
            </div>
          </div>
          
          {/* Revenue Breakdown */}
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Revenue Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">App Purchases</span>
                  <span className="text-xl font-bold text-white">${appStoreData.stats.revenue.app.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Subscriptions (last 28d)</span>
                  <span className="text-xl font-bold text-white">${appStoreData.stats.revenue.subscription.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-white/20 flex justify-between items-center">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-2xl font-bold text-white">${appStoreData.stats.revenue.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Download Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Last 7 Days</span>
                  <span className="text-xl font-bold text-white">{appStoreData.stats.downloads.last7Days.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Last 30 Days</span>
                  <span className="text-xl font-bold text-white">{appStoreData.stats.downloads.last30Days.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-white/20 flex justify-between items-center">
                  <span className="text-white font-semibold">All Time</span>
                  <span className="text-2xl font-bold text-white">{appStoreData.stats.downloads.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings Distribution */}
          {appStoreData.stats.ratings.count > 0 && (
            <div className="mt-8 bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Rating Distribution</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const key = `${['one', 'two', 'three', 'four', 'five'][star - 1]}Star` as keyof typeof appStoreData.stats.ratings.distribution;
                  const count = appStoreData.stats.ratings.distribution[key];
                  const percent = appStoreData.stats.ratings.count > 0 ? (count / appStoreData.stats.ratings.count) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <div className="w-16 text-sm text-white/90">{star} ⭐</div>
                      <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm text-white/90 text-right">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Reviews */}
          {appStoreData.reviews && appStoreData.reviews.length > 0 && (
            <div className="mt-8 bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Recent Reviews</h3>
              <div className="space-y-4">
                {appStoreData.reviews.slice(0, 3).map((review: any, i: number) => (
                  <div key={i} className="border-b border-white/10 pb-3 last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-yellow-400">{'⭐'.repeat(review.attributes?.rating || 5)}</div>
                      <div className="text-sm text-white/70">{review.attributes?.reviewerNickname || 'Anonymous'}</div>
                    </div>
                    <p className="text-sm text-white/90">{review.attributes?.body || 'No comment'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
