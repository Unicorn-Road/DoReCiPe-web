'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types/blog';

interface BlogPostFormProps {
  post?: BlogPost;
  isEdit?: boolean;
}

export default function BlogPostForm({ post, isEdit = false }: BlogPostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    published: post?.published || false,
    featuredImage: post?.featuredImage || '',
    tags: post?.tags?.join(', ') || '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      const url = isEdit ? `/api/admin/blog/${post?.id}` : '/api/admin/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/blog');
      } else {
        alert('Failed to save post');
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-pantry mb-2">
          Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border-2 border-cream-300 rounded-lg focus:border-apricot-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-pantry mb-2">
          Slug (URL path) *
        </label>
        <input
          type="text"
          required
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full px-4 py-2 border-2 border-cream-300 rounded-lg focus:border-apricot-600 focus:outline-none"
          placeholder="my-blog-post"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-pantry mb-2">
          Excerpt *
        </label>
        <textarea
          required
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border-2 border-cream-300 rounded-lg focus:border-apricot-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-pantry mb-2">
          Content (Markdown supported) *
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={20}
          className="w-full px-4 py-2 border-2 border-cream-300 rounded-lg focus:border-apricot-600 focus:outline-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-pantry mb-2">
          Featured Image URL
        </label>
        <input
          type="url"
          value={formData.featuredImage}
          onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
          className="w-full px-4 py-2 border-2 border-cream-300 rounded-lg focus:border-apricot-600 focus:outline-none"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-pantry mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-4 py-2 border-2 border-cream-300 rounded-lg focus:border-apricot-600 focus:outline-none"
          placeholder="recipes, tips, cooking"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="w-5 h-5 text-apricot-600 border-cream-300 rounded focus:ring-apricot-500"
        />
        <label htmlFor="published" className="ml-3 text-sm font-semibold text-pantry">
          Published (visible to public)
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-apricot-600 text-white rounded-lg font-semibold hover:bg-apricot-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="px-6 py-3 bg-pantry-100 text-pantry rounded-lg font-semibold hover:bg-pantry-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
