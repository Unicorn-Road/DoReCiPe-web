# Do-Re-Ci-Pe Admin System

## Admin Credentials

**Email:** `admin@dorecipe.app`  
**Password:** `DoReCiPe2025!Admin`

**Login URL:** `/admin/login`

## Setup

### 1. Environment Variables

Copy `.env.local.example` to `.env.local` (already done) and ensure these values are set:

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3007  # Change to https://dorecipe.app in production
NEXTAUTH_SECRET=<already-set>

# Admin Credentials
ADMIN_EMAIL=admin@dorecipe.app
ADMIN_PASSWORD_HASH=<already-set>

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-NTLV4SJLQS
```

### 2. Google Analytics Data API (Optional)

To get real analytics data in the admin dashboard:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google Analytics Data API
3. Create a Service Account
4. Download the JSON key file
5. Add the service account email to your Google Analytics property with Viewer permissions
6. Add the JSON content to `.env.local`:
   ```
   GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}
   GA_PROPERTY_ID=properties/467875699
   ```

## Features

### ✅ Implemented
- **Authentication System**: Secure login with NextAuth.js
- **Admin Dashboard**: Analytics overview with page views, users, sessions, bounce rate
- **Blog Management System**: Full CRUD for blog posts with markdown support
- **Public Blog Pages**: Blog listing and individual post pages with SEO
- **Quick Links**: Direct access to Google Analytics and Search Console
- **Session Management**: Secure JWT-based sessions
- **Protected Routes**: Automatic redirect if not authenticated

### 🚧 Ready for Implementation
- **Real Analytics**: Mock data currently, Google Analytics Data API integration ready
- **User Management**: Can be extended from current auth system
- **Blog Markdown Rendering**: Currently plain text, can add markdown parser

## Admin Routes

- `/admin/login` - Login page
- `/admin/dashboard` - Main dashboard with analytics
- `/admin/blog` - Blog post list (create, edit, delete)
- `/admin/blog/new` - Create new blog post
- `/admin/blog/[id]/edit` - Edit existing blog post

## Public Routes

- `/blog` - Blog listing page (published posts only)
- `/blog/[slug]` - Individual blog post page

## Security Notes

1. **Password Hashing**: Admin password is bcrypt-hashed with salt rounds of 10
2. **Environment Variables**: Credentials stored in `.env.local` which is git-ignored
3. **JWT Sessions**: Secure session management with signed JWT tokens
4. **Protected API Routes**: All admin API endpoints check for valid session

## Changing Admin Password

To generate a new password hash:

```bash
node << 'EOF'
const bcrypt = require('bcryptjs');
const password = 'YourNewPasswordHere';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
EOF
```

Then update `ADMIN_PASSWORD_HASH` in `.env.local`.

## Google Search Console

While there's no direct API integration, the admin dashboard provides a quick link to Google Search Console.

To verify your site:
1. Visit [Google Search Console](https://search.google.com/search-console)
2. Add property for `dorecipe.app`
3. Verify via DNS TXT record or HTML file upload

## Production Deployment

### Vercel Environment Variables

Add these to your Vercel project settings:

```
NEXTAUTH_URL=https://dorecipe.app
NEXTAUTH_SECRET=<your-secret>
ADMIN_EMAIL=admin@dorecipe.app
ADMIN_PASSWORD_HASH=<your-hash>
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-NTLV4SJLQS
GA_PROPERTY_ID=properties/467875699
GOOGLE_APPLICATION_CREDENTIALS_JSON=<your-service-account-json>
```

## Blog System

### Features
- **File-based Storage**: Blog posts stored as JSON files in `data/blog/`
- **CRUD Operations**: Create, read, update, and delete blog posts
- **Draft/Published Status**: Control visibility of posts
- **Featured Images**: Optional image URLs for posts
- **Tags**: Comma-separated tags for categorization
- **Markdown Support**: Content field supports markdown (rendering to be enhanced)
- **SEO Optimization**: Metadata and Open Graph tags generated automatically

### Creating a Blog Post

1. Log in to admin at `/admin/login`
2. Click "Blog Posts" in navigation
3. Click "Create New Post"
4. Fill in:
   - **Title**: Post title
   - **Slug**: URL-friendly path (e.g., "my-first-post")
   - **Excerpt**: Short summary for listings
   - **Content**: Full post content (markdown supported)
   - **Featured Image**: Optional image URL
   - **Tags**: Comma-separated (e.g., "recipes, tips, cooking")
   - **Published**: Check to make visible to public
5. Click "Create Post"

### Data Storage

Blog posts are stored in `data/blog/` as JSON files (git-ignored). Each post file is named with a timestamp ID. 

**Important**: These files are not committed to Git. For production:
- Consider using a database (Vercel Postgres, MongoDB, etc.)
- Or use a headless CMS (Sanity, Contentful, etc.)
- Current file-based approach works for development and low-volume sites

### Enhancing Blog Posts

To add markdown rendering:

```bash
npm install react-markdown
```

Then update `src/app/blog/[slug]/page.tsx` to use `<ReactMarkdown>{post.content}</ReactMarkdown>`

## Support

For questions or issues, contact the development team.
