export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
  featuredImage?: string;
  tags?: string[];
}

export interface CreateBlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  featuredImage?: string;
  tags?: string[];
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
  id: string;
}
