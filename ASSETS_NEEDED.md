# Assets Needed for Do-Re-Ci-Pe Website

## ✅ Completed

- [x] App icon (1024x1024) - `public/icon.png`
- [x] Logo PNG - `public/logo.png`
- [x] Site manifest
- [x] Robots.txt
- [x] Sitemap generation

## 📱 Required Favicons

Generate these from `/public/icon.png`:

### Standard Favicons
- [ ] `favicon.ico` (32x32)
- [ ] `favicon-16x16.png`
- [ ] `favicon-32x32.png`

### Apple Touch Icons
- [ ] `apple-touch-icon.png` (180x180)
- [ ] `apple-touch-icon-precomposed.png` (180x180)

### Android/Chrome
- [ ] `android-chrome-192x192.png`
- [ ] `android-chrome-512x512.png`

### Quick Generation Commands

```bash
# Using ImageMagick (install: brew install imagemagick)
cd public

# Favicon
convert icon.png -resize 32x32 favicon-32x32.png
convert icon.png -resize 16x16 favicon-16x16.png
convert favicon-32x32.png favicon.ico

# Apple Touch Icon
convert icon.png -resize 180x180 apple-touch-icon.png
cp apple-touch-icon.png apple-touch-icon-precomposed.png

# Android
convert icon.png -resize 192x192 android-chrome-192x192.png
convert icon.png -resize 512x512 android-chrome-512x512.png
```

Or use online tool: [favicon.io](https://favicon.io/favicon-converter/)

## 📸 Screenshots Needed

### Homepage Hero
- [ ] **iPhone mockup** with app interface (1200x800 or similar)
  - Suggested: Recipe list view or recipe generation screen
  - Format: PNG with transparency or on branded background
  - Location: `public/screenshots/hero.png`

### Feature Screenshots (3-5 images)
For Features page and social sharing:

1. [ ] **Recipe Generation** - AI generating recipes from photo
   - Size: 1080x1920 (iPhone aspect ratio)
   - Location: `public/screenshots/feature-ai.png`

2. [ ] **Photo Scanning** - Camera capturing fridge/pantry
   - Size: 1080x1920
   - Location: `public/screenshots/feature-scan.png`

3. [ ] **Recipe Detail** - Beautiful recipe view with steps
   - Size: 1080x1920
   - Location: `public/screenshots/feature-recipe.png`

4. [ ] **Pantry Management** - Pantry inventory view
   - Size: 1080x1920
   - Location: `public/screenshots/feature-pantry.png`

5. [ ] **Meal Planning** - Weekly meal plan view
   - Size: 1080x1920
   - Location: `public/screenshots/feature-meal-plan.png`

### Social Media Images

#### Open Graph Image (Primary)
- [ ] **OG Image** for social sharing
  - Size: 1200x630px
  - Content: App name, tagline, key visual
  - Location: `public/og-image.png`
  - Template:
    ```
    ┌─────────────────────────────────────┐
    │                                     │
    │         Do-Re-Ci-Pe Logo            │
    │    Your Kitchen's New Rhythm        │
    │                                     │
    │    [App screenshot or icon]         │
    │                                     │
    │    Available on iOS                 │
    └─────────────────────────────────────┘
    ```

#### Twitter Card
- [ ] **Twitter Card Image**
  - Size: 1200x600px
  - Similar to OG image
  - Location: `public/twitter-card.png`

### App Store Assets (For Download Page)
- [ ] App Store badge (can use Apple's official badge)
- [ ] QR code linking to App Store (optional)

## 🎨 Optional Marketing Assets

### For Future Use
- [ ] Video demo (15-30 seconds)
- [ ] Animated GIFs of key features
- [ ] User testimonial photos/avatars
- [ ] Press kit logo variations
  - Horizontal lockup
  - Vertical lockup
  - Icon only
  - Light/dark versions

## 📊 Quick Screenshot Guide

### Recommended Tool: iPhone Screenshots

**Method 1: From Xcode Simulator**
```bash
# Run app in simulator
# Cmd + S to capture screenshot
# Screenshots save to Desktop
```

**Method 2: Real Device**
```bash
# Take screenshots on device (Power + Volume Up)
# AirDrop to Mac
# Use preview to crop/adjust
```

**Method 3: Mockup Generators**
- [Previewed.app](https://previewed.app) - Free iPhone mockups
- [Smartmockups](https://smartmockups.com) - Browser-based
- [Mockuphone](https://mockuphone.com) - Simple online tool

### Screenshot Specifications

**Resolution**: Use 2x or 3x retina
- iPhone 15 Pro: 1179 x 2556 px
- Safe area: Consider notch/dynamic island

**Content**: 
- Clean UI (no lorem ipsum)
- Realistic data
- Good lighting/photography for food images
- Brand colors prominent

**Format**:
- PNG for transparency
- WebP for web optimization
- AVIF for modern browsers (Next.js handles conversion)

## 🔄 Asset Update Workflow

1. **Export from Xcode** - Take screenshots in simulator
2. **Crop & Optimize** - Remove extra chrome, optimize size
3. **Place in `/public`** - Following structure above
4. **Update references** - Check all image paths in components
5. **Test** - Verify images load on all pages
6. **Commit** - Add to git with descriptive message

## 📝 Content Decisions Needed

Before finalizing:
- [ ] Confirm app name for website (Do-Re-Ci-Pe vs Recipe Recall)
- [ ] Actual App Store URL or beta TestFlight link
- [ ] Real user metrics (or remove social proof section)
- [ ] Subscription pricing tiers
- [ ] Legal jurisdiction for Terms/Privacy
- [ ] Actual support email addresses

## 🚀 Priority Order

**Critical for Launch:**
1. Favicons (all sizes)
2. OG social image
3. One hero screenshot for homepage
4. App Store URL (or "Coming Soon" messaging)

**Important:**
5. Feature screenshots (3-5)
6. Twitter card image
7. Real metrics or remove placeholder stats

**Nice to Have:**
8. Video demo
9. Animated GIFs
10. Press kit materials

---

**Current Status**: Basic assets copied, need favicons + screenshots for production launch.
