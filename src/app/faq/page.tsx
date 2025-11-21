import { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Do-Re-Ci-Pe. Get answers about features, pricing, compatibility, and more.",
};

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-cream-50 to-cream">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="heading-1 mb-6">Frequently Asked Questions</h1>
          <p className="body-lg text-pantry-400">
            Everything you need to know about Do-Re-Ci-Pe. Can't find what you're looking for? 
            Email us at support@dorecipe.app
          </p>
        </div>
      </Section>

      {/* FAQ Categories */}
      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Getting Started */}
          <div>
            <h2 className="heading-3 mb-6 text-coral">Getting Started</h2>
            <div className="space-y-4">
              {gettingStarted.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="font-semibold text-pantry text-lg mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-pantry-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Usage */}
          <div>
            <h2 className="heading-3 mb-6 text-coral">Features & Usage</h2>
            <div className="space-y-4">
              {featuresUsage.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="font-semibold text-pantry text-lg mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-pantry-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Plans */}
          <div>
            <h2 className="heading-3 mb-6 text-coral">Pricing & Plans</h2>
            <div className="space-y-4">
              {pricing.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="font-semibold text-pantry text-lg mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-pantry-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical */}
          <div>
            <h2 className="heading-3 mb-6 text-coral">Technical</h2>
            <div className="space-y-4">
              {technical.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="font-semibold text-pantry text-lg mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-pantry-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Security */}
          <div>
            <h2 className="heading-3 mb-6 text-coral">Privacy & Security</h2>
            <div className="space-y-4">
              {privacy.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="font-semibold text-pantry text-lg mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-pantry-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-apricot-100 to-coral-100">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-2 mb-4">Still have questions?</h2>
          <p className="body-lg text-pantry-400 mb-8">
            We're here to help. Reach out and we'll get back to you within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@dorecipe.app"
              className="btn btn-primary"
            >
              Email Support
            </a>
            <Link href="/download">
              <Button variant="outline">Download App</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

// FAQ Data
const gettingStarted = [
  {
    question: "How much does Do-Re-Ci-Pe cost?",
    answer:
      "Do-Re-Ci-Pe offers three plans: DO ($4.99 one-time for 50 recipe credits), RE (monthly unlimited for $1.99/month), and MI (annual unlimited for $7.99/year). All plans include photo scanning, recipe generation, saving recipes, and cooking tools.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "Nope! You can start using Do-Re-Ci-Pe immediately after download without creating an account. An optional account lets you sync your recipes across devices via iCloud, but it's not required.",
  },
  {
    question: "What devices does Do-Re-Ci-Pe work on?",
    answer:
      "Do-Re-Ci-Pe is currently available for iPhone and iPad running iOS 16 or later. We're focusing on making the iOS experience incredible first before expanding to other platforms.",
  },
  {
    question: "How do I get started?",
    answer:
      "Download the app from the App Store, open it, and take a photo of your fridge or pantry. We'll recognize your ingredients and suggest recipes you can make. That's it!",
  },
];

const featuresUsage = [
  {
    question: "How does the photo scanning work?",
    answer:
      "Our AI-powered photo recognition identifies ingredients from photos of your fridge, pantry, grocery receipts, or even cookbook pages. Just snap a photo and we'll figure out what you have. The more clearly items are visible, the better the recognition.",
  },
  {
    question: "How accurate is the ingredient recognition?",
    answer:
      "Pretty accurate! Our AI recognizes hundreds of common ingredients. However, it's AI-powered, so it's not perfect. You can always edit or add ingredients manually if something is missed or misidentified.",
  },
  {
    question: "Can I generate recipes without taking photos?",
    answer:
      "Absolutely! You can manually type in ingredients or use recipes from previous photo scans. The photo feature is just one way to input what you have.",
  },
  {
    question: "Do recipes work offline?",
    answer:
      "Saved recipes work offline, so you can access them anytime. However, generating new recipes requires an internet connection since the AI processing happens in the cloud.",
  },
  {
    question: "Can I adjust recipes for dietary restrictions?",
    answer:
      "Yes! You can specify dietary preferences like vegan, vegetarian, gluten-free, keto, and more. The app generates recipes that match your needs or suggests substitutions.",
  },
  {
    question: "Can I save and organize recipes?",
    answer:
      "Definitely. You can save unlimited recipes, organize them with tags, and search through your collection. If you enable iCloud sync, your recipes stay synced across all your devices.",
  },
];

const pricing = [
  {
    question: "What are the pricing plans?",
    answer:
      "We offer three plans: DO Plan ($4.99 one-time) gives you 50 recipe generation credits. RE Plan ($1.99/month) provides unlimited recipe generation monthly. MI Plan ($7.99/year) offers unlimited recipe generation annually at a significant discount. All plans include full access to features like photo scanning, saving recipes, timers, and more.",
  },
  {
    question: "What's the difference between DO, RE, and MI plans?",
    answer:
      "DO is perfect for occasional cooks with 50 credits (buy once, use anytime). RE is ideal for regular users who want unlimited recipes each month. MI is our best value for committed home cooks, offering unlimited annual access at the cost of just 4 months. All plans have identical features, just different credit limits.",
  },
  {
    question: "Do recipe credits expire?",
    answer:
      "DO Plan credits never expire. Once you purchase 50 credits, use them at your own pace. RE and MI plans provide unlimited credits during your active subscription period.",
  },
  {
    question: "Will there be ads?",
    answer:
      "No ads, ever. We believe cooking apps should be calm and focused, not cluttered with distractions. We'll never show ads in Do-Re-Ci-Pe.",
  },
  {
    question: "Can I use Do-Re-Ci-Pe for my restaurant or business?",
    answer:
      "Do-Re-Ci-Pe is designed for home cooking. If you're interested in commercial use, please contact us at support@dorecipe.app to discuss options.",
  },
];

const technical = [
  {
    question: "Does Do-Re-Ci-Pe work on Android?",
    answer:
      "Not yet. We're currently iOS-only while we perfect the experience on iPhone and iPad. An Android version may come in the future, but we don't have a timeline yet.",
  },
  {
    question: "How much storage does the app use?",
    answer:
      "The app itself is about 150 MB. Storage usage grows as you save recipes and photos, but most users will stay well under 500 MB total.",
  },
  {
    question: "Do I need camera permissions?",
    answer:
      "Yes, if you want to use the photo scanning feature. You can deny camera access and still use the app, but you'll need to manually enter ingredients instead of scanning photos.",
  },
  {
    question: "Why does the app need internet?",
    answer:
      "Generating recipes requires internet because the AI processing happens in the cloud. Once recipes are saved, you can view them offline. Internet is also needed for syncing recipes across devices.",
  },
  {
    question: "Is my data synced across devices?",
    answer:
      "Yes, if you enable iCloud sync. Your saved recipes, preferences, and ingredient lists will sync automatically across all your Apple devices signed into the same iCloud account.",
  },
];

const privacy = [
  {
    question: "What data does Do-Re-Ci-Pe collect?",
    answer:
      "We collect only what's necessary: photos you upload (to recognize ingredients), recipes you generate, and basic usage data to improve the app. We don't sell your data or use it for advertising. See our Privacy Policy for full details.",
  },
  {
    question: "Are my photos stored permanently?",
    answer:
      "No. Photos you take are processed to identify ingredients and then deleted. We don't keep copies of your fridge or pantry photos on our servers.",
  },
  {
    question: "Can I delete my data?",
    answer:
      "Yes! You can delete your account and all associated data anytime from the app settings. Local data on your device is removed when you uninstall the app.",
  },
  {
    question: "Is Do-Re-Ci-Pe safe for kids?",
    answer:
      "Do-Re-Ci-Pe doesn't have social features, ads, or external links that could expose kids to inappropriate content. However, it's a cooking app designed for adults and should be used with parental supervision for children.",
  },
  {
    question: "Do you share data with third parties?",
    answer:
      "We use third-party services for essential functions like cloud storage (iCloud), analytics, and AI processing (OpenAI for recipe generation). We don't sell or share your personal data for advertising or marketing purposes. See our Privacy Policy for specifics.",
  },
];
