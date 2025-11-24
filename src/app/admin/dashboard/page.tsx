'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import MarketingDashboard from '@/components/MarketingDashboard';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    pageviews: 0,
    users: 0,
    sessions: 0,
    bounceRate: 0,
    topPages: [] as { path: string; views: number }[],
    topSources: [] as { source: string; sessions: number }[],
    dailyTrend: [] as { date: string; users: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      // Fetch analytics data
      fetch('/api/admin/analytics')
        .then((res) => res.json())
        .then((data) => {
          // Handle error response or set stats
          if (data.error) {
            setStats({
              pageviews: 0,
              users: 0,
              sessions: 0,
              bounceRate: 0,
              topPages: [],
              topSources: [],
              dailyTrend: [],
            });
          } else {
            setStats(data);
          }
          setLoading(false);
        })
        .catch(() => {
          setStats({
            pageviews: 0,
            users: 0,
            sessions: 0,
            bounceRate: 0,
            topPages: [],
            topSources: [],
            dailyTrend: [],
          });
          setLoading(false);
        });
    }
  }, [status]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-apricot-200 border-t-apricot-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white border-b border-cream-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-pantry">
            Do-Re-Ci-Pe Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-pantry-400">{session?.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="text-sm text-coral-500 hover:text-coral-600 font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <nav className="flex gap-4">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-apricot-600 text-white rounded-lg font-semibold"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/blog"
              className="px-4 py-2 bg-white text-pantry rounded-lg font-semibold hover:bg-cream-100 border border-cream-200"
            >
              Blog Posts
            </Link>
          </nav>
          <Link
            href="/admin/blog/new"
            className="px-6 py-3 bg-coral text-white rounded-lg font-bold hover:bg-coral-600 shadow-md hover:shadow-lg transition-all"
          >
            ✍️ Write New Post
          </Link>
        </div>

        {/* Marketing KPIs - Most Important */}
        <div className="mb-8">
          <MarketingDashboard />
        </div>

        {/* Analytics Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-pantry mb-4">Website Analytics (Last 30 Days)</h2>
          {loading ? (
            <div className="text-pantry-400">Loading analytics...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
                <div className="text-sm text-pantry-400 mb-2">Page Views</div>
                <div className="text-3xl font-bold text-pantry">{stats.pageviews.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
                <div className="text-sm text-pantry-400 mb-2">Users</div>
                <div className="text-3xl font-bold text-pantry">{stats.users.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
                <div className="text-sm text-pantry-400 mb-2">Sessions</div>
                <div className="text-3xl font-bold text-pantry">{stats.sessions.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
                <div className="text-sm text-pantry-400 mb-2">Bounce Rate</div>
                <div className="text-3xl font-bold text-pantry">{stats.bounceRate.toFixed(1)}%</div>
              </div>
            </div>
          )}
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top Pages */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
            <h2 className="text-xl font-bold text-pantry mb-4">Top Pages</h2>
            {loading ? (
              <div className="text-pantry-400 text-sm">Loading...</div>
            ) : stats.topPages.length > 0 ? (
              <div className="space-y-3">
                {stats.topPages.map((page, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-pantry-600 truncate flex-1 mr-4">
                      {page.path}
                    </span>
                    <span className="text-sm font-semibold text-pantry">
                      {page.views.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-pantry-400 text-sm">No data yet</div>
            )}
          </div>

          {/* Top Sources */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
            <h2 className="text-xl font-bold text-pantry mb-4">Traffic Sources</h2>
            {loading ? (
              <div className="text-pantry-400 text-sm">Loading...</div>
            ) : stats.topSources.length > 0 ? (
              <div className="space-y-3">
                {stats.topSources.map((source, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-pantry-600">
                      {source.source}
                    </span>
                    <span className="text-sm font-semibold text-pantry">
                      {source.sessions.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-pantry-400 text-sm">No data yet</div>
            )}
          </div>
        </div>

        {/* 7-Day Trend */}
        {!loading && stats.dailyTrend.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-md border border-cream-200 mb-8">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-pantry uppercase tracking-wide">📊 Daily Active Users</h2>
                <p className="text-sm text-pantry-400 mt-1">Last 7 days</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-pantry">
                  {stats.dailyTrend[stats.dailyTrend.length - 1]?.users.toLocaleString()}
                </div>
                <div className="text-xs text-pantry-400">Today</div>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4 h-64">
              {stats.dailyTrend.map((day, i) => {
                const maxUsers = Math.max(...stats.dailyTrend.map(d => d.users));
                const height = maxUsers > 0 ? (day.users / maxUsers) * 100 : 0;
                const monthDay = `${day.date.slice(4, 6)}/${day.date.slice(6, 8)}`;
                const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const date = new Date(parseInt(day.date.slice(0, 4)), parseInt(day.date.slice(4, 6)) - 1, parseInt(day.date.slice(6, 8)));
                const dayName = dayNames[date.getDay()];
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="text-sm font-bold text-pantry opacity-0 group-hover:opacity-100 transition-opacity">
                      {day.users.toLocaleString()}
                    </div>
                    <div
                      className="w-full bg-gradient-to-t from-apricot-600 to-apricot-400 rounded-t-lg hover:from-coral-600 hover:to-coral-400 transition-colors cursor-pointer shadow-sm"
                      style={{ height: `${height}%`, minHeight: height > 0 ? '8px' : '0' }}
                      title={`${dayName}, ${monthDay}: ${day.users} users`}
                    />
                    <div className="text-center">
                      <div className="text-xs font-medium text-pantry">{dayName}</div>
                      <div className="text-xs text-pantry-400">{monthDay}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300">
          <h2 className="text-xl font-bold text-pantry mb-4">Quick Links</h2>
          <div className="space-y-3">
            <a
              href="https://analytics.google.com/analytics/web/#/p498164889/reports/intelligenthome"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-apricot-600 hover:text-apricot-700 font-semibold"
            >
              → Google Analytics Dashboard
            </a>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-apricot-600 hover:text-apricot-700 font-semibold"
            >
              → Google Search Console
            </a>
            <Link
              href="/admin/blog/new"
              className="block text-apricot-600 hover:text-apricot-700 font-semibold"
            >
              → Create New Blog Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
