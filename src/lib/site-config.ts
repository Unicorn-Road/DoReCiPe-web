/**
 * Site Configuration
 * Central place for all site-specific content and settings
 * Update these values to reflect actual app details
 */

export const siteConfig = {
  // App Information
  appName: "Do-Re-Ci-Pe",
  internalName: "Recipe Recall",
  tagline: "Your kitchen's new rhythm",
  description:
    "A kitchen sidekick that makes dinner easier, smarter, and way more fun. Take a photo of your fridge and we'll handle the hard part.",

  // App Store
  appStore: {
    url: "https://apps.apple.com/us/app/do-re-ci-pe/id6745566524",
    appId: "com.seahostler.dorecipe",
    isLive: true,
    minIOSVersion: "16.0",
    appSize: "150", // MB - TODO: Update with actual size from App Store
  },

  // Features (from actual app)
  features: {
    aiGeneration: true,
    photoScanning: true,
    receiptScanning: true,
    pantryManagement: true,
    mealPlanning: true,
    shoppingLists: true,
    cloudSync: true,
    offlineMode: true, // Local SwiftData
    nutritionTracking: true,
    timers: true,
    dietaryFilters: true,
  },

  // Subscription Tiers (RevenueCat)
  subscriptions: {
    doTier: {
      name: "DO",
      price: 4.99,
      type: "one-time",
      credits: 50,
      description: "50 recipe generation credits, never expire",
    },
    reTier: {
      name: "RE",
      price: 1.99,
      type: "monthly",
      credits: "unlimited",
      description: "Unlimited recipe generation per month",
    },
    miTier: {
      name: "MI",
      price: 7.99,
      type: "annual",
      credits: "unlimited",
      description: "Unlimited recipe generation per year",
    },
  },

  // Metrics (Update with real data when available)
  metrics: {
    users: null, // Set to null to hide until real data available
    recipesGenerated: null,
    appStoreRating: null,
  },

  // Contact
  contact: {
    support: "support@dorecipe.app",
    privacy: "privacy@dorecipe.app",
  },

  // Social Media
  social: {
    instagram: "https://www.instagram.com/do.re.ci.pe/",
    tiktok: "https://tiktok.com/@dorecipeapp",
    youtube: "https://youtube.com/@dorecipeapp",
  },

  // Legal
  legal: {
    companyName: "Recipe Recall", // TODO: Update with legal entity
    jurisdiction: "United States", // TODO: Update if different
  },

  // Technical
  tech: {
    backend: "Firebase Cloud Functions",
    ai: "OpenAI",
    sync: "CloudKit",
    subscriptions: "RevenueCat",
  },
} as const;

export type SiteConfig = typeof siteConfig;
