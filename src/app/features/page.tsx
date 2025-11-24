import { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Features | AI Recipe Generation & Meal Planning",
  description:
    "Discover Do-Re-Ci-Pe's AI-powered features: photo ingredient recognition, personalized recipe generation, meal planning calendar, smart grocery lists, and cooking timers. Everything you need to cook with what you have.",
};

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-cream-50 to-cream">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="heading-1 mb-6">Features that feel like magic</h1>
          <p className="body-lg text-pantry-400">
            AI-powered photo recognition turns your ingredients into personalized recipes. Add meal planning, smart grocery lists, and cooking timers—everything you need to cook with what you have.
          </p>
        </div>
      </Section>

      {/* Core Features */}
      <Section>
        <div className="space-y-24">
          {detailedFeatures.map((feature, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex mb-4 text-coral">
                  <Icon name={feature.icon} className="w-12 h-12" />
                </div>
                <h2 className="heading-3 mb-4">{feature.title}</h2>
                <p className="body-lg text-pantry-400 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-coral text-xl mt-1">✓</span>
                      <span className="body-base text-charcoal">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="bg-gradient-to-br from-apricot-100 to-coral-100 rounded-2xl aspect-square flex items-center justify-center shadow-medium">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">{feature.icon}</div>
                    <p className="text-pantry-400">Feature Illustration</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Feature Grid */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">And there&apos;s more</h2>
          <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
            Little touches that make a big difference in your daily cooking.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="card">
              <div className="flex mb-3 text-coral">
                <Icon name={feature.icon} className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-pantry text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-pantry-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-pantry to-pantry-600 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
            Ready to make dinner easier?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Download Do-Re-Ci-Pe and see what your fridge can do.
          </p>
          <Link href="/download">
            <Button size="lg" className="bg-coral hover:bg-coral-400">
              Get Started
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}

const detailedFeatures = [
  {
    icon: "camera",
    title: "Smart Photo Recognition",
    description:
      "Take a photo of anything food-related and we'll figure it out. Your fridge, pantry, grocery receipts, or even cookbook pages: we read it all.",
    benefits: [
      "Instant ingredient detection from photos",
      "Works with receipts, labels, and handwritten lists",
      "Recognizes hundreds of ingredients automatically",
      "No manual typing required",
    ],
  },
  {
    icon: "target",
    title: "Personalized Recipe Generation",
    description:
      "Get recipes built around what you actually have. No idealized ingredient lists, no last-minute shopping trips: just real cooking for real life.",
    benefits: [
      "Recipes match your exact ingredients",
      "Adapts to dietary preferences and restrictions",
      "Suggests substitutions for missing items",
      "Learns what you like over time",
    ],
  },
  {
    icon: "lightning",
    title: "Kitchen Sidekick Tools",
    description:
      "All the little helpers that make cooking less stressful. From smart timers to reheating tips, we've got your back.",
    benefits: [
      "Multiple cooking timers with notifications",
      "Reheating and storage guidance",
      "Cooking technique tips and tricks",
      "Ingredient swap suggestions on the fly",
    ],
  },
  {
    icon: "book",
    title: "Your Personal Cookbook",
    description:
      "Save recipes you love and build your collection. Everything synced, searchable, and ready when you need it.",
    benefits: [
      "Save unlimited recipes",
      "Organize with tags and collections",
      "Search your saved recipes instantly",
      "Access anywhere on your iPhone or iPad",
    ],
  },
  {
    icon: "calendar",
    title: "Meal Planning Made Easy",
    description:
      "Plan your week ahead with smart suggestions based on what you have. Organize recipes by day, get reminders, and never stress about what's for dinner.",
    benefits: [
      "Weekly meal planning calendar",
      "Smart recipe suggestions for each day",
      "Drag and drop recipes to plan meals",
      "Generate shopping lists from your meal plan",
    ],
  },
];

const additionalFeatures = [
  {
    icon: "refresh",
    title: "Scale Recipes",
    description: "Cooking for one or eight? Adjust serving sizes instantly.",
  },
  {
    icon: "clock",
    title: "Step Timers",
    description: "Never overcook again with smart, synchronized timers.",
  },
  {
    icon: "salad",
    title: "Dietary Filters",
    description: "Vegan, keto, gluten-free: we adapt to your needs.",
  },
  {
    icon: "lightbulb",
    title: "Smart Suggestions",
    description: "Get ideas based on what's about to expire.",
  },
  {
    icon: "clipboard",
    title: "Smart Shopping Lists",
    description: "Auto-generate organized shopping lists from recipes. Check off items as you shop.",
  },
  {
    icon: "moon",
    title: "Offline Mode",
    description: "Access your saved recipes even without internet.",
  },
];
