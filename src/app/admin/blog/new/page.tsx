'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import BlogPostForm from '@/components/BlogPostForm';

export default function NewBlogPost() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-apricot-200 border-t-apricot-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-white border-b border-cream-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-pantry">
            Create New Blog Post
          </h1>
          <Link
            href="/admin/blog"
            className="text-sm text-apricot-600 hover:text-apricot-700 font-semibold"
          >
            ← Back to Posts
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-cream-300">
          <BlogPostForm />
        </div>
      </div>
    </div>
  );
}
