import fs from 'fs';
import path from 'path';
import { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from '@/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'data', 'blog');

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.json'));
  const posts = files.map(file => {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    return JSON.parse(content) as BlogPost;
  });
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.published);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as BlogPost;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getAllPosts();
  return allPosts.find(post => post.slug === slug) || null;
}

export async function createPost(input: CreateBlogPostInput, authorEmail: string): Promise<BlogPost> {
  const id = Date.now().toString();
  const now = new Date().toISOString();
  
  const post: BlogPost = {
    id,
    ...input,
    author: authorEmail,
    publishedAt: now,
    updatedAt: now,
  };
  
  const filePath = path.join(BLOG_DIR, `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
  
  return post;
}

export async function updatePost(input: UpdateBlogPostInput): Promise<BlogPost | null> {
  const existingPost = await getPostById(input.id);
  if (!existingPost) {
    return null;
  }
  
  const updatedPost: BlogPost = {
    ...existingPost,
    ...input,
    updatedAt: new Date().toISOString(),
  };
  
  const filePath = path.join(BLOG_DIR, `${input.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(updatedPost, null, 2));
  
  return updatedPost;
}

export async function deletePost(id: string): Promise<boolean> {
  const filePath = path.join(BLOG_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    return false;
  }
  fs.unlinkSync(filePath);
  return true;
}
