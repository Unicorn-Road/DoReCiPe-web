import Link from 'next/link';
import { getPublishedPosts } from '@/lib/blog';
import Section from '@/components/Section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, recipes, and insights from Do-Re-Ci-Pe',
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">Blog</h1>
          <p className="body-lg text-pantry-400">
            Tips, recipes, and insights to make cooking easier
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-pantry-400">
            No blog posts yet. Check back soon!
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block card hover:shadow-lg transition-shadow"
              >
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                )}
                <div className="p-6">
                  <h2 className="heading-4 mb-3">{post.title}</h2>
                  <p className="body-base text-pantry-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-pantry-300">
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-cream-100 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
