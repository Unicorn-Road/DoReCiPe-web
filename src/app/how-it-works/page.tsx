import { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Do-Re-Ci-Pe turns your ingredients into delicious meals in three simple steps. Photo scanning, smart recipes, and cooking guidance.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-cream-50 to-cream">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="heading-1 mb-6">From ingredients to dinner in 4 steps</h1>
          <p className="body-lg text-pantry-400">
            Add ingredients, generate recipes, cook with guidance, and plan ahead. It&apos;s that simple.
          </p>
        </div>
      </Section>

      {/* Main Steps */}
      <Section>
        <div className="max-w-5xl mx-auto space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-coral rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-glow">
                    {index + 1}
                  </div>
                  <h2 className="heading-3">{step.title}</h2>
                </div>
                <p className="body-lg text-pantry-400 mb-6">
                  {step.description}
                </p>
                <ul className="space-y-3">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-coral text-xl mt-1">✓</span>
                      <span className="body-base text-charcoal">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="bg-gradient-to-br from-apricot-100 to-coral-100 rounded-3xl aspect-square flex items-center justify-center shadow-large">
                  <div className="text-center p-8">
                    <div className="flex justify-center mb-4 text-coral">
                      <Icon name={step.icon} className="w-20 h-20" />
                    </div>
                    <p className="text-pantry-400 font-medium">{step.imageCaption}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Additional Features */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">More helpful features</h2>
          <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
            We&apos;ve thought of everything to make your cooking experience smoother.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-4 text-coral">
                <Icon name={feature.icon} className="w-12 h-12" />
              </div>
              <h3 className="heading-5 mb-3">{feature.title}</h3>
              <p className="body-base text-pantry-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How AI Works */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Powered by smart AI</h2>
            <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
              Our AI understands real kitchens and creates recipes that actually work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="card">
                <h3 className="heading-5 mb-3">{feature.title}</h3>
                <p className="body-base text-pantry-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-coral to-coral-400 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-2 mb-6">Ready to see it in action?</h2>
          <p className="text-xl text-white/90 mb-8">
            Download Do-Re-Ci-Pe and discover how easy dinner can be.
          </p>
          <Link href="/download">
            <Button 
              size="lg" 
              className="bg-white text-coral hover:bg-cream-100 shadow-large"
            >
              Get Do-Re-Ci-Pe for iOS
            </Button>
          </Link>
          <p className="mt-6 text-white/70 text-sm">
            Starting at $4.99 · iOS 16 or later
          </p>
        </div>
      </Section>
    </>
  );
}

// Data
const steps = [
  {
    title: "Scan your fridge or pantry",
    icon: "camera",
    description:
      "Take a photo of your fridge, pantry, receipts, or even cookbook pages. Our AI instantly recognizes ingredients and knows exactly what you have on hand.",
    details: [
      "Photo recognition for instant ingredient detection",
      "Works with receipts, labels, and handwritten lists",
      "Barcode scanning for pantry management",
      "Track expiration dates with visual warnings",
    ],
    imageCaption: "Photo Recognition",
  },
  {
    title: "Generate personalized recipes",
    icon: "target",
    description:
      "Provide a text prompt (like \"quick pasta dinner\") with optional images. Our AI generates multiple recipe options tailored to what you actually have.",
    details: [
      "Multiple recipe suggestions per request",
      "Adapts to dietary preferences and restrictions",
      "Complete with ingredients, steps, and nutrition",
      "Preview and choose which recipes to save",
    ],
    imageCaption: "AI Recipe Generation",
  },
  {
    title: "Cook with confidence",
    icon: "lightning",
    description:
      "Follow step-by-step instructions with built-in timers. Each step includes helpful tips and explains the \"why\" behind cooking techniques.",
    details: [
      "Step-by-step instructions with timers",
      "Cooking tips and technique explanations",
      "Fractional measurements (½ cup, ⅓ tsp)",
      "Optional details: nutrition, prep time, origin",
    ],
    imageCaption: "Cooking Mode",
  },
  {
    title: "Plan & organize",
    icon: "calendar",
    description:
      "Save your favorite recipes to your personal cookbook. Plan meals for the week and generate shopping lists automatically.",
    details: [
      "Save unlimited recipes with CloudKit sync",
      "Weekly meal planning calendar",
      "Auto-generated shopping lists from recipes",
      "Search and organize with tags",
    ],
    imageCaption: "Meal Planning",
  },
];

const additionalFeatures = [
  {
    icon: "calendar",
    title: "Meal Planning",
    description: "Plan your week ahead with smart suggestions based on what you have.",
  },
  {
    icon: "clipboard",
    title: "Shopping Lists",
    description: "Auto-generate organized lists from recipes and check off items as you shop.",
  },
  {
    icon: "book",
    title: "Recipe Library",
    description: "Save your favorites and build a personal cookbook that syncs everywhere.",
  },
  {
    icon: "refresh",
    title: "Scale Recipes",
    description: "Cooking for one or eight? Adjust serving sizes with one tap.",
  },
  {
    icon: "salad",
    title: "Dietary Filters",
    description: "Vegan, keto, gluten-free: we adapt recipes to your lifestyle.",
  },
  {
    icon: "moon",
    title: "Offline Mode",
    description: "Access saved recipes anytime, even without internet.",
  },
];

const aiFeatures = [
  {
    title: "Understands Context",
    description:
      "Our AI doesn't just recognize ingredients—it understands how they work together, what's in season, and what makes sense for your skill level.",
  },
  {
    title: "Learns Your Preferences",
    description:
      "The more you cook, the better it gets. The AI learns your tastes, dietary needs, and cooking style to suggest recipes you'll love.",
  },
  {
    title: "Real-World Recipes",
    description:
      "We generate practical recipes for real kitchens, not magazine-perfect fantasies. If you're missing an ingredient, we'll suggest what to use instead.",
  },
  {
    title: "Food Safety First",
    description:
      "Every recipe follows proper food safety guidelines for cooking temperatures, storage, and ingredient combinations.",
  },
];
