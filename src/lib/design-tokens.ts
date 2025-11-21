/**
 * Design Tokens for Do-Re-Ci-Pe
 * Based on Brand Playbook color theory and design principles
 */

// Color Tokens with semantic meanings based on color theory
export const colors = {
  // Primary brand colors
  cream: "#F8F4EC", // Warmth, approachability (60% usage)
  apricot: "#F4D1A6", // Accent, onboarding highlights (15% usage)
  coral: "#F47C64", // Emotional moments, CTAs (10% usage)
  pantry: "#2D3A4A", // Authority, structure (10% usage)
  charcoal: "#1C1C1C", // Primary text (5% usage)

  // Semantic color applications
  background: {
    primary: "#F8F4EC", // Cream - main backgrounds
    secondary: "#FFFFFF", // White - cards, elevated surfaces
    tertiary: "#F9E7D3", // Apricot 100 - subtle highlights
  },
  text: {
    primary: "#1C1C1C", // Charcoal - body text
    secondary: "#2D3A4A", // Pantry - headers, important text
    tertiary: "#5E6C82", // Pantry 400 - secondary info
    inverse: "#FFFFFF", // White - text on dark backgrounds
  },
  action: {
    primary: "#F47C64", // Coral - primary CTAs
    primaryHover: "#F04B2E", // Coral 400 - hover state
    secondary: "#2D3A4A", // Pantry - secondary actions
    secondaryHover: "#1F2937", // Pantry 600 - hover state
  },
  border: {
    light: "#E8DCC6", // Cream 300 - subtle dividers
    medium: "#B8BEC8", // Pantry 200 - standard borders
    dark: "#2D3A4A", // Pantry - emphasis borders
  },
  state: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
};

// Typography Scale - Expert System
export const typography = {
  fontFamily: {
    sans: 'var(--font-inter), Inter, system-ui, -apple-system, sans-serif',
    serif: 'var(--font-source-serif), "Source Serif 4", Georgia, serif',
    mono: '"SF Mono", "JetBrains Mono", Consolas, monospace',
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px - Body text
    lg: "1.125rem", // 18px - Large body
    xl: "1.25rem", // 20px - Small headings
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px - Hero headings
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  lineHeight: {
    tight: "1.1", // Large display text
    snug: "1.25", // Headings
    normal: "1.5", // Body text
    relaxed: "1.625", // Comfortable reading
    loose: "1.75", // Very comfortable
  },
  letterSpacing: {
    tighter: "-0.02em",
    tight: "-0.01em",
    normal: "0em",
    wide: "0.01em",
    wider: "0.02em",
  },
};

// Spacing System (8px base grid)
export const spacing = {
  px: "1px",
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
  40: "10rem", // 160px
  48: "12rem", // 192px
  56: "14rem", // 224px
  64: "16rem", // 256px
};

// Border Radius (soft, rounded aesthetic)
export const borderRadius = {
  none: "0",
  sm: "0.25rem", // 4px
  DEFAULT: "0.5rem", // 8px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  "3xl": "2rem", // 32px
  full: "9999px",
};

// Shadows (soft, warm aesthetic)
export const shadows = {
  soft: "0 2px 8px rgba(0, 0, 0, 0.05)",
  medium: "0 4px 16px rgba(0, 0, 0, 0.08)",
  large: "0 8px 32px rgba(0, 0, 0, 0.12)",
  glow: "0 0 24px rgba(244, 124, 100, 0.15)", // Coral glow
  inner: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
};

// Breakpoints (mobile-first)
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Z-Index Scale
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
};

// Transitions
export const transitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  smooth: "400ms cubic-bezier(0.4, 0, 0.2, 1)",
};

// Container Max Widths
export const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
  full: "100%",
};

// Grid System
export const grid = {
  columns: 12,
  gutter: spacing[6], // 24px
};
