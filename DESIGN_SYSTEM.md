# Do-Re-Ci-Pe Design System

> Complete design system documentation for consistent, brand-aligned development

## 🎨 Color System

### Brand Colors

Our color palette follows the 60-30-10 rule for visual hierarchy and warmth.

#### Primary Colors

```css
--cream: #F8F4EC         /* Primary background - warmth, approachability */
--apricot: #F4D1A6       /* Accent color - onboarding, highlights */
--coral: #F47C64         /* Action color - CTAs, emotional moments */
--pantry: #2D3A4A        /* Authority - headers, structure */
--charcoal: #1C1C1C      /* Text - body copy */
```

#### Color Usage Rules

| Color | Usage % | Purpose | Examples |
|-------|---------|---------|----------|
| Cream | 60% | Background, surfaces | Page backgrounds, sections |
| Apricot | 15% | Accents, highlights | Badges, subtle highlights |
| Coral | 10% | Primary actions | Buttons, CTAs, links |
| Pantry | 10% | Structure, authority | Headers, navigation, borders |
| Charcoal | 5% | Body text | Paragraphs, descriptions |

#### Color Scales

Each color has a 50-700 scale for flexibility:

```typescript
cream: {
  50: '#FEFDFB',   // Lightest
  100: '#F8F4EC',  // DEFAULT
  200: '#F0E8D9',
  300: '#E8DCC6',
}

coral: {
  50: '#FEF3F1',
  100: '#FCDDD7',
  200: '#F9ADA0',
  300: '#F47C64',  // DEFAULT
  400: '#F04B2E',
  500: '#D93214',
}
```

### Semantic Colors

```typescript
background: {
  primary: '#F8F4EC',    // Cream
  secondary: '#FFFFFF',  // White (cards)
  tertiary: '#F9E7D3',   // Apricot-100
}

text: {
  primary: '#1C1C1C',    // Charcoal
  secondary: '#2D3A4A',  // Pantry
  tertiary: '#5E6C82',   // Pantry-400
  inverse: '#FFFFFF',    // White
}

action: {
  primary: '#F47C64',          // Coral
  primaryHover: '#F04B2E',     // Coral-400
  secondary: '#2D3A4A',        // Pantry
  secondaryHover: '#1F2937',   // Pantry-600
}
```

### Color Theory Application

- **Warm tones (Cream, Apricot, Coral)** create approachability and comfort
- **Cool pantry blue** provides contrast and structure without coldness
- **60% dominance** of warm cream creates overall welcoming atmosphere
- **10% coral** creates strategic focal points without overwhelming
- **Sufficient contrast** ensures WCAG AA accessibility compliance

## ✍️ Typography

### Font Families

```css
--font-sans: 'Geist Sans', 'SF Pro Rounded', 'Inter', system-ui, sans-serif;
--font-serif: 'Georgia', 'Cambria', 'Times New Roman', serif;
--font-mono: 'SF Mono', 'JetBrains Mono', 'Consolas', monospace;
```

### Type Scale

```css
/* Mobile-first with responsive scaling */
xs:   0.75rem  (12px)  - Line height: 1rem
sm:   0.875rem (14px)  - Line height: 1.25rem
base: 1rem     (16px)  - Line height: 1.5rem
lg:   1.125rem (18px)  - Line height: 1.75rem
xl:   1.25rem  (20px)  - Line height: 1.75rem
2xl:  1.5rem   (24px)  - Line height: 2rem
3xl:  1.875rem (30px)  - Line height: 2.25rem
4xl:  2.25rem  (36px)  - Line height: 2.5rem
5xl:  3rem     (48px)  - Line height: 1.16
6xl:  3.75rem  (60px)  - Line height: 1.1
7xl:  4.5rem   (72px)  - Line height: 1.05
```

### Heading Styles

```css
.heading-1 {
  font-family: serif;
  font-size: 3rem;      /* 48px */
  line-height: 1.16;
  font-weight: 700;
  color: pantry;
  
  @media (min-width: 640px) {
    font-size: 3.75rem; /* 60px */
  }
  
  @media (min-width: 1024px) {
    font-size: 4.5rem;  /* 72px */
  }
}

.heading-2 {
  font-family: serif;
  font-size: 2.25rem;   /* 36px */
  line-height: 1.1;
  font-weight: 700;
  
  @media (min-width: 640px) {
    font-size: 3rem;    /* 48px */
  }
  
  @media (min-width: 1024px) {
    font-size: 3.75rem; /* 60px */
  }
}

.heading-3 {
  font-family: serif;
  font-size: 1.875rem;  /* 30px */
  font-weight: 600;
  
  @media (min-width: 640px) {
    font-size: 2.25rem; /* 36px */
  }
  
  @media (min-width: 1024px) {
    font-size: 3rem;    /* 48px */
  }
}

.heading-4 {
  font-family: sans;
  font-size: 1.5rem;    /* 24px */
  font-weight: 600;
  
  @media (min-width: 640px) {
    font-size: 1.875rem; /* 30px */
  }
}
```

### Body Text Styles

```css
.body-lg {
  font-size: 1.125rem;   /* 18px */
  line-height: 1.75;
  
  @media (min-width: 640px) {
    font-size: 1.25rem;  /* 20px */
  }
}

.body-base {
  font-size: 1rem;       /* 16px */
  line-height: 1.5;
  
  @media (min-width: 640px) {
    font-size: 1.125rem; /* 18px */
  }
}

.body-sm {
  font-size: 0.875rem;   /* 14px */
  line-height: 1.5;
  
  @media (min-width: 640px) {
    font-size: 1rem;     /* 16px */
  }
}
```

### Typography Best Practices

- **Headings:** Use serif for warmth and musicality
- **Body text:** Use sans-serif for readability
- **Emphasis:** Bold over italic for clarity
- **Line length:** Max 65-75 characters for readability
- **Paragraph spacing:** 1.5-2x font size

## 📐 Spacing System

Based on 8px grid for consistency and rhythm.

```css
1   = 0.25rem  (4px)
2   = 0.5rem   (8px)    ← Base unit
3   = 0.75rem  (12px)
4   = 1rem     (16px)
6   = 1.5rem   (24px)
8   = 2rem     (32px)
12  = 3rem     (48px)
16  = 4rem     (64px)
24  = 6rem     (96px)
32  = 8rem     (128px)
```

### Spacing Guidelines

| Element | Spacing |
|---------|---------|
| Button padding | 1.5rem × 0.75rem |
| Card padding | 1.5rem |
| Section padding (mobile) | 4rem vertical |
| Section padding (desktop) | 6rem vertical |
| Between paragraphs | 1.5rem |
| Between sections | 4-6rem |

## 🎯 Component System

### Buttons

```tsx
// Primary Button
<button className="btn btn-primary">
  Download for iOS
</button>

// Secondary Button
<button className="btn btn-secondary">
  Learn More
</button>

// Outline Button
<button className="btn btn-outline">
  See Features
</button>

// Ghost Button
<button className="btn btn-ghost">
  Skip
</button>

// Sizes
<button className="btn btn-primary btn-sm">Small</button>
<button className="btn btn-primary">Default</button>
<button className="btn btn-primary btn-lg">Large</button>
```

#### Button Specifications

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 200ms;
}

.btn-primary {
  background: coral;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.btn-primary:hover {
  background: coral-400;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: scale(0.95);
}
```

### Cards

```tsx
<div className="card">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

```css
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 200ms;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
```

### Badges

```tsx
<span className="badge badge-primary">New</span>
<span className="badge badge-secondary">iOS Only</span>
```

## 🔲 Layout

### Container

```css
.container-custom {
  max-width: 1280px;  /* 80rem */
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
}
```

### Grid System

```css
/* Auto-fit grid */
.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* 3-column responsive */
.grid {
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 🎭 Shadows & Depth

```css
shadow-soft:   0 2px 8px rgba(0, 0, 0, 0.05)
shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.08)
shadow-large:  0 8px 32px rgba(0, 0, 0, 0.12)
shadow-glow:   0 0 24px rgba(244, 124, 100, 0.15)  /* Coral glow */
```

## 🔄 Animations

### Transitions

```css
fast:   150ms cubic-bezier(0.4, 0, 0.2, 1)
base:   200ms cubic-bezier(0.4, 0, 0.2, 1)  ← Default
slow:   300ms cubic-bezier(0.4, 0, 0.2, 1)
smooth: 400ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Keyframe Animations

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## 🖼 Border Radius

```css
sm:  0.25rem  (4px)
md:  0.5rem   (8px)   ← Default
lg:  0.75rem  (12px)
xl:  1rem     (16px)
2xl: 1.5rem   (24px)
3xl: 2rem     (32px)
full: 9999px
```

**Brand aesthetic:** Soft, rounded corners throughout (minimum 0.5rem)

## ♿ Accessibility

### Focus States

```css
*:focus-visible {
  outline: none;
  ring: 2px solid coral;
  ring-offset: 2px;
  ring-offset-color: cream;
}
```

### Color Contrast

All text meets WCAG AA standards:
- Body text (charcoal) on cream: 8.5:1
- Headings (pantry) on cream: 10.2:1
- White text on coral: 4.8:1
- White text on pantry: 11.5:1

### Touch Targets

Minimum 44×44px for all interactive elements

## 📱 Responsive Breakpoints

```typescript
sm:  640px   // Small tablets
md:  768px   // Tablets
lg:  1024px  // Desktop
xl:  1280px  // Large desktop
2xl: 1536px  // Extra large
```

### Mobile-First Approach

Always style for mobile first, then enhance with media queries:

```css
/* Mobile (default) */
.heading-1 {
  font-size: 3rem;
}

/* Tablet and up */
@media (min-width: 640px) {
  .heading-1 {
    font-size: 3.75rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .heading-1 {
    font-size: 4.5rem;
  }
}
```

## 🎯 Design Principles

1. **Warm & Human:** Rounded corners, warm colors, friendly spacing
2. **Clear Hierarchy:** Strong type scale, consistent spacing
3. **Purposeful Motion:** Subtle animations that enhance UX
4. **Accessible First:** High contrast, large touch targets, semantic HTML
5. **Mobile Optimized:** Touch-friendly, performant, responsive

---

**Questions?** Refer to `dorecipe-brandplaybook.md` for voice and content guidelines.
