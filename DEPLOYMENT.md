# Do-Re-Ci-Pe Deployment Guide

> Complete deployment instructions and quick reference for production deployment

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Git repository with this project

### One-Click Deploy

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Do-Re-Ci-Pe website"
git branch -M main
git remote add origin https://github.com/yourusername/dorecipe-web.git
git push -u origin main
```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!** Your site will be live at `your-project.vercel.app`

### Custom Domain Setup

1. In Vercel dashboard, go to Project Settings → Domains
2. Add your custom domain (e.g., `dorecipe.app`)
3. Update your DNS records as instructed by Vercel:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (usually < 1 hour)

## 📦 Build & Deploy Process

### Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build locally
npm run build
npm start

# Type check
npm run type-check

# Lint check
npm run lint
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Output will be in .next/ folder
# Vercel handles this automatically
```

### Build Configuration

The site is configured for optimal Vercel deployment:

**next.config.mjs:**
- React strict mode enabled
- Compression enabled
- Image optimization (AVIF/WebP)
- Powered-by header removed
- Optimized package imports

**Vercel automatically provides:**
- Global CDN
- SSL certificates
- Edge caching
- Analytics (if enabled)
- Automatic deployments on git push

## 🌍 Environment Variables

No environment variables are required for base deployment.

### Optional Variables

Add these in Vercel dashboard under Settings → Environment Variables:

```bash
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# App Store URL (optional - override default)
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/your-app-id

# Vercel Analytics (optional - free tier)
# Enable in Vercel dashboard
```

### Adding Environment Variables

1. Vercel Dashboard → Your Project → Settings
2. Navigate to "Environment Variables"
3. Add key-value pairs
4. Select environments (Production, Preview, Development)
5. Save and redeploy

## 🔄 Continuous Deployment

Vercel automatically deploys:

- **Production:** Every push to `main` branch
- **Preview:** Every pull request
- **Branch Previews:** Every push to any branch

### Deployment Workflow

```
Local Development → Git Push → Automatic Build → Deploy to Vercel → Live
```

### Preview Deployments

Every PR gets a unique preview URL:
- `your-project-git-feature-branch.vercel.app`
- Perfect for testing before merging

## 📊 Post-Deployment Checklist

### Immediately After First Deploy

- [ ] Verify homepage loads correctly
- [ ] Test all navigation links
- [ ] Check mobile responsiveness
- [ ] Test App Store download button
- [ ] Verify footer links work
- [ ] Check all pages render correctly
- [ ] Test form submissions (if any)

### SEO Setup

- [ ] Verify robots.txt is accessible: `/robots.txt`
- [ ] Check sitemap: `/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify OpenGraph tags with [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Performance Optimization

- [ ] Run Lighthouse audit (target: 90+ scores)
- [ ] Check Core Web Vitals in Vercel Analytics
- [ ] Test page load speed on mobile
- [ ] Verify image optimization working
- [ ] Check font loading performance

### Analytics Setup (Optional)

1. **Google Analytics 4**
   ```tsx
   // In src/app/layout.tsx
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   <GoogleAnalytics gaId="G-XXXXXXXXXX" />
   ```

2. **Vercel Analytics** (Recommended - Free)
   - Enable in Vercel dashboard
   - Provides Web Vitals tracking
   - No code changes needed

3. **Plausible or Fathom** (Privacy-friendly alternatives)

## 🔍 Monitoring & Maintenance

### Vercel Dashboard Features

- **Deployments:** View all deployment history
- **Analytics:** Traffic and performance metrics
- **Logs:** Real-time function logs
- **Speed Insights:** Core Web Vitals tracking

### Regular Maintenance

**Weekly:**
- Check Vercel deployment status
- Review analytics for traffic patterns
- Monitor error logs if any

**Monthly:**
- Update dependencies: `npm update`
- Review and update social proof metrics
- Refresh testimonials if needed
- Update screenshots when app updates

**Quarterly:**
- Run full security audit
- Review and update legal pages
- Check all external links
- Update Node.js version if needed

## 🐛 Troubleshooting

### Build Failures

**Error: TypeScript errors**
```bash
# Run type check locally
npm run type-check

# Fix errors then commit and push
```

**Error: Linting issues**
```bash
# Run lint locally
npm run lint

# Auto-fix if possible
npm run lint -- --fix
```

**Error: Module not found**
```bash
# Clean install dependencies
rm -rf node_modules
rm package-lock.json
npm install
```

### Deployment Issues

**Site not updating after push**
- Check Vercel dashboard for deployment status
- Verify you pushed to the correct branch
- Check build logs for errors

**404 errors on routes**
- Verify file structure in `src/app/`
- Check that files are named `page.tsx`
- Ensure proper folder structure

**Images not loading**
- Verify images are in `/public` folder
- Check image paths are correct
- Ensure images are committed to git

### Performance Issues

**Slow page load**
- Run Lighthouse audit
- Check image sizes (optimize if > 500KB)
- Verify fonts are loading correctly
- Check for render-blocking resources

**High Time to First Byte (TTFB)**
- Check if using Server-Side Rendering unnecessarily
- Consider static generation for pages
- Review API routes if any

## 📱 Testing Checklist

### Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Safari (iOS and macOS)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### Device Testing

- [ ] iPhone (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)

### Accessibility Testing

- [ ] Tab navigation works throughout
- [ ] Screen reader compatibility (VoiceOver/NVDA)
- [ ] Color contrast passes WCAG AA
- [ ] All images have alt text
- [ ] Forms have proper labels

## 🔐 Security

### Automatically Handled by Vercel

- SSL/TLS certificates (automatic)
- DDoS protection
- Edge network security
- HTTPS enforcement

### Best Practices

- Keep dependencies updated
- Use environment variables for sensitive data
- Review Vercel security logs regularly
- Enable Vercel Firewall (paid plans)

## 📈 Scaling

The current setup handles significant traffic out of the box:

**Vercel Free Tier:**
- 100GB bandwidth/month
- 100 deployments/day
- Unlimited sites
- Global CDN

**If you need more:**
- Upgrade to Vercel Pro ($20/mo)
- 1TB bandwidth
- Advanced analytics
- Password protection
- Team collaboration

## 🆘 Support Resources

- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **GitHub Issues:** Your repository issues page

## 📞 Emergency Contacts

If the site goes down:

1. Check [Vercel Status](https://vercel-status.com)
2. Review Vercel deployment logs
3. Rollback to previous deployment in Vercel dashboard
4. Contact support@dorecipe.app

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Quality Checks
npm run type-check       # TypeScript validation
npm run lint             # ESLint check

# Deployment
git push origin main     # Auto-deploys to production
vercel                   # Deploy via Vercel CLI
vercel --prod            # Deploy to production manually

# Maintenance
npm update               # Update dependencies
npm audit                # Security audit
npm audit fix            # Fix vulnerabilities
```

---

**🚀 Ready to deploy!** Follow the Quick Deploy section and you'll be live in minutes.
