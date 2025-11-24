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
- **Quick Links**: Direct access to Google Analytics and Search Console
- **Session Management**: Secure JWT-based sessions
- **Protected Routes**: Automatic redirect if not authenticated

### 🚧 Ready for Implementation
- **Blog System**: Structure is ready, needs CRUD operations
- **Real Analytics**: Mock data currently, Google Analytics Data API integration ready
- **User Management**: Can be extended from current auth system

## Admin Routes

- `/admin/login` - Login page
- `/admin/dashboard` - Main dashboard with analytics
- `/admin/blog` - Blog post management (to be implemented)
- `/admin/blog/new` - Create new blog post (to be implemented)

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

## Blog System (Next Steps)

The blog system structure is ready. To complete it:

1. Choose a content management approach:
   - **Simple**: JSON files in `/public/blog/`
   - **Database**: Add Vercel Postgres or similar
   - **Headless CMS**: Integrate Sanity, Contentful, or similar

2. Implement API routes:
   - `GET /api/admin/blog` - List all posts
   - `POST /api/admin/blog` - Create post
   - `PUT /api/admin/blog/[id]` - Update post
   - `DELETE /api/admin/blog/[id]` - Delete post

3. Create public blog pages:
   - `/blog` - List all published posts
   - `/blog/[slug]` - Individual blog post

4. Add to sitemap for SEO

## Support

For questions or issues, contact the development team.
