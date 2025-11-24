'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

export default function AdminBlogList() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPosts();
    }
  }, [status]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchPosts();
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
    }
  };

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
            Blog Posts
          </h1>
          <Link
            href="/admin/dashboard"
            className="text-sm text-apricot-600 hover:text-apricot-700 font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-pantry">All Posts</h2>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-apricot-600 text-white rounded-lg font-semibold hover:bg-apricot-700"
          >
            Create New Post
          </Link>
        </div>

        {loading ? (
          <div className="text-pantry-400">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-cream-300">
            <p className="text-pantry-400 mb-4">No blog posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="inline-block px-4 py-2 bg-apricot-600 text-white rounded-lg font-semibold hover:bg-apricot-700"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl p-6 shadow-sm border-2 border-cream-300 hover:border-apricot-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-pantry">
                        {post.title}
                      </h3>
                      {!post.published && (
                        <span className="px-2 py-1 bg-pantry-100 text-pantry-600 text-xs font-semibold rounded">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-pantry-400 text-sm mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-pantry-300">
                      <span>By {post.author}</span>
                      <span>•</span>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>/{post.slug}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="px-3 py-1.5 text-sm bg-pantry text-white rounded-lg hover:bg-pantry-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1.5 text-sm bg-coral-500 text-white rounded-lg hover:bg-coral-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
