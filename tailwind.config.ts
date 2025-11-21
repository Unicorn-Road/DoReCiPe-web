import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors from Playbook
        cream: {
          DEFAULT: "#F8F4EC",
          50: "#FEFDFB",
          100: "#F8F4EC",
          200: "#F0E8D9",
          300: "#E8DCC6",
        },
        apricot: {
          DEFAULT: "#F4D1A6",
          50: "#FEF8F2",
          100: "#F9E7D3",
          200: "#F4D1A6",
          300: "#EFBB79",
          400: "#EAA54C",
        },
        coral: {
          DEFAULT: "#F47C64",
          50: "#FEF3F1",
          100: "#FCDDD7",
          200: "#F9ADA0",
          300: "#F47C64",
          400: "#F04B2E",
          500: "#D93214",
        },
        pantry: {
          DEFAULT: "#2D3A4A",
          50: "#F3F4F6",
          100: "#E5E7EB",
          200: "#B8BEC8",
          300: "#8B95A5",
          400: "#5E6C82",
          500: "#2D3A4A",
          600: "#1F2937",
          700: "#1A202C",
        },
        charcoal: {
          DEFAULT: "#1C1C1C",
          50: "#F7F7F7",
          100: "#E5E5E5",
          200: "#B8B8B8",
          300: "#8B8B8B",
          400: "#5E5E5E",
          500: "#313131",
          600: "#1C1C1C",
          700: "#0A0A0A",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        serif: [
          "var(--font-source-serif)",
          "Source Serif 4",
          "Georgia",
          "serif",
        ],
        mono: ["SF Mono", "JetBrains Mono", "Consolas", "monospace"],
      },
      fontSize: {
        // Refined Typographic Scale with optimal line-heights
        xs: ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.375rem", letterSpacing: "0.005em" }],
        base: ["1rem", { lineHeight: "1.625rem", letterSpacing: "0em" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.005em" }],
        xl: ["1.25rem", { lineHeight: "1.875rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.015em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.025em" }],
        "5xl": ["3rem", { lineHeight: "3.25rem", letterSpacing: "-0.03em" }],
        "6xl": ["3.75rem", { lineHeight: "4rem", letterSpacing: "-0.035em" }],
        "7xl": ["4.5rem", { lineHeight: "4.75rem", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0em",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.04em",
      },
      spacing: {
        // 8px base grid
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        // Soft, rounded aesthetic
        DEFAULT: "0.5rem",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.05)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.08)",
        large: "0 8px 32px rgba(0, 0, 0, 0.12)",
        glow: "0 0 24px rgba(244, 124, 100, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
