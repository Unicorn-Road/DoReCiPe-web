/**
 * JSON-LD Structured Data for SEO
 * Helps search engines understand the content and context
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Do-Re-Ci-Pe",
  url: "https://dorecipe.app",
  logo: "https://dorecipe.app/logo.png",
  description:
    "A kitchen sidekick that makes dinner easier, smarter, and way more fun.",
  foundingDate: "2024",
  sameAs: [
    "https://instagram.com/dorecipeapp",
    "https://tiktok.com/@dorecipeapp",
    "https://youtube.com/@dorecipeapp",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@dorecipe.app",
    contactType: "Customer Support",
  },
};

export const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Do-Re-Ci-Pe",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "iOS 16.0 or later",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
    worstRating: "1",
  },
  description:
    "Take a photo of your fridge and we'll handle the hard part. Do-Re-Ci-Pe is an AI-powered cooking companion that transforms real-life ingredients into real-life meals.",
  screenshot: "https://dorecipe.app/screenshots/hero.png",
  downloadUrl: "https://apps.apple.com/app/dorecipe",
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Do-Re-Ci-Pe",
  url: "https://dorecipe.app",
  description: "Your kitchen's new rhythm",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://dorecipe.app/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Do-Re-Ci-Pe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Do-Re-Ci-Pe is an AI-powered cooking companion app for iOS. Take a photo of your fridge, pantry, or receipts, and we'll generate personalized recipes based on what you have.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Do-Re-Ci-Pe cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Do-Re-Ci-Pe offers three plans: DO Plan ($4.99 one-time for 50 recipe credits), RE Plan ($1.99/month unlimited), and MI Plan ($7.99/year unlimited). All plans include photo scanning, recipe generation, saving recipes, and cooking tools.",
      },
    },
    {
      "@type": "Question",
      name: "What devices does Do-Re-Ci-Pe work on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Do-Re-Ci-Pe is currently available for iOS devices (iPhone and iPad) running iOS 16.0 or later. Android support is not currently available.",
      },
    },
    {
      "@type": "Question",
      name: "How does the photo scanning work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply take a photo of your fridge, pantry, grocery receipts, or even cookbook pages. Our AI recognizes ingredients automatically and generates recipes you can make with what you have.",
      },
    },
  ],
};
