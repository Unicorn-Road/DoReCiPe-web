# Do-Re-Ci-Pe Website

> Your kitchen's new rhythm — A complete, production-ready B2C website for Do-Re-Ci-Pe iOS app.

## 🎯 Overview

This is the official marketing website for Do-Re-Ci-Pe, an AI-powered cooking companion app. Built with Next.js 14, TypeScript, and Tailwind CSS, optimized for Vercel deployment.

### Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design tokens
- **Animations:** Framer Motion
- **Deployment:** Vercel (optimized)
- **Font System:** Geist Sans + System fonts

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

The site will be available at `http://localhost:3000`

## 📁 Project Structure

```
DoReCiPe-web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── features/          # Features page
│   │   ├── about/             # About page
│   │   ├── download/          # Download page
│   │   ├── privacy/           # Privacy policy
│   │   ├── terms/             # Terms of service
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── globals.css        # Global styles
│   │   └── sitemap.ts         # Dynamic sitemap
│   ├── components/            # Reusable React components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Button.tsx         # Button component
│   │   └── Section.tsx        # Section container
│   └── lib/                   # Utilities and constants
│       ├── design-tokens.ts   # Brand design tokens
│       ├── utils.ts           # Helper functions
│       └── structured-data.ts # SEO schemas
├── public/                    # Static assets
│   └── robots.txt            # SEO robots file
├── tailwind.config.ts        # Tailwind configuration
├── next.config.mjs           # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🎨 Design System

### Brand Colors

The design system follows the brand playbook with carefully selected colors:

- **Cream** (`#F8F4EC`) - Primary background (60% usage)
- **Apricot** (`#F4D1A6`) - Accent highlights (15% usage)
- **Coral** (`#F47C64`) - CTAs and emotional moments (10% usage)
- **Pantry** (`#2D3A4A`) - Headers and structure (10% usage)
- **Charcoal** (`#1C1C1C`) - Body text (5% usage)

### Typography

- **Headings:** System serif fonts (Georgia, Cambria)
- **Body:** Geist Sans / SF Pro Rounded
- **Code/Timers:** SF Mono

### Components

All components follow the brand voice and design principles:
- Soft, rounded aesthetics
- Warm, approachable interactions
- Clear hierarchy
- Accessible focus states

## 📄 Pages

### Homepage (`/`)
- Hero with primary tagline
- Social proof metrics
- Feature highlights
- How it works (3 steps)
- Testimonials
- Final CTA

### Features (`/features`)
- Detailed feature breakdown
- Benefit-focused content
- Visual feature cards

### About (`/about`)
- Brand story
- Mission and values
- Philosophy

### Download (`/download`)
- App Store CTA
- Device requirements
- FAQ section

### Legal
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)

## 🔍 SEO & Performance

### Implemented Optimizations

- ✅ Server-side rendering (SSR)
- ✅ Dynamic sitemap generation
- ✅ Comprehensive metadata
- ✅ OpenGraph tags
- ✅ Twitter Cards
- ✅ JSON-LD structured data
- ✅ Semantic HTML
- ✅ Image optimization (AVIF/WebP)
- ✅ Font optimization
- ✅ Mobile-first responsive design

### Performance Features

- **Next.js 14 App Router** for optimal performance
- **Static generation** where possible
- **Image optimization** with Next/Image
- **Font optimization** with next/font
- **Code splitting** automatic with Next.js
- **Compression** enabled in production

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Next.js configuration
3. Deploy with one click

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

### Environment Variables

No environment variables required for base deployment. Add these if needed:

```env
# Optional
NEXT_PUBLIC_GA_ID=          # Google Analytics
NEXT_PUBLIC_APP_STORE_URL=  # App Store link
```

### Build Command

```bash
npm run build
```

### Output

The build generates an optimized production bundle in `.next/`

## 🎯 Content Guidelines

### Brand Voice

Following the Do-Re-Ci-Pe Brand Playbook:

- **60%** Warm & Encouraging
- **25%** Clever & Playful  
- **10%** Straightforward Utility
- **5%** Chef-level Authority

### Writing Style

- ✅ Simple, rhythmic phrasing
- ✅ Light humor to ease frustration
- ✅ Human, not marketing-speak
- ✅ Surprising honesty over clichés
- ❌ No wellness preaching
- ❌ No fancy-chef elitism
- ❌ No hyperactive TikTok voice

## 🛠 Customization

### Adding New Pages

1. Create new folder in `src/app/[page-name]`
2. Add `page.tsx` with metadata export
3. Use existing components (`Section`, `Button`)
4. Update sitemap in `src/app/sitemap.ts`
5. Add navigation link in `src/components/Header.tsx`

### Modifying Design Tokens

Edit `src/lib/design-tokens.ts` and `tailwind.config.ts`

### Adding Components

Create in `src/components/` following existing patterns:
- Use TypeScript
- Export named or default
- Include JSDoc comments
- Follow brand styling

## 📱 Responsive Design

Breakpoints:
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

All components are mobile-first and fully responsive.

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- Focus states on all interactive elements
- Screen reader friendly
- Color contrast WCAG AA compliant

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 📈 Analytics Integration

Add your analytics provider in `src/app/layout.tsx`:

```tsx
// Example: Google Analytics
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

## 🔄 Updates & Maintenance

### Regular Updates

- Review and update social proof metrics
- Update testimonials
- Refresh screenshots when app UI changes
- Keep legal pages current

### Content Updates

Edit page content directly in respective `.tsx` files:
- Homepage: `src/app/page.tsx`
- Features: `src/app/features/page.tsx`
- etc.

## 📞 Support

For questions or issues:
- **Email:** support@dorecipe.app
- **Documentation:** This README
- **Brand Guidelines:** `dorecipe-brandplaybook.md`

## 📝 License

Proprietary - Do-Re-Ci-Pe © 2024

---

**Built with ❤️ and good kitchen vibes**
