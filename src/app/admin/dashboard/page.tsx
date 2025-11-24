'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    pageviews: 0,
    users: 0,
    sessions: 0,
    bounceRate: 0,
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
            setStats({ pageviews: 0, users: 0, sessions: 0, bounceRate: 0 });
          } else {
            setStats(data);
          }
          setLoading(false);
        })
        .catch(() => {
          setStats({ pageviews: 0, users: 0, sessions: 0, bounceRate: 0 });
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

        {/* Analytics Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-pantry mb-4">Analytics Overview</h2>
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

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-cream-200">
          <h2 className="text-xl font-bold text-pantry mb-4">Quick Links</h2>
          <div className="space-y-3">
            <a
              href="https://analytics.google.com/analytics/web/#/p467875699/reports/intelligenthome"
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
