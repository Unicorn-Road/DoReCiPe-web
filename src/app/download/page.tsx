import { Metadata } from "next";
import Section from "@/components/Section";
import Icon from "@/components/Icon";
import { getAppStoreLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Download | AI Recipe App for iOS",
  description:
    "Download Do-Re-Ci-Pe AI recipe app for iPhone and iPad. Turn your ingredients into personalized meals with photo recognition and smart recipe generation. iOS 16+. Plans from $4.99.",
};

export default function DownloadPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-cream-50 to-cream">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block mb-6">
            <span className="badge badge-secondary">iOS Only</span>
          </div>
          
          <h1 className="heading-1 mb-6">Download the AI Recipe App</h1>
          
          <p className="body-lg text-pantry-400 mb-12">
            Get Do-Re-Ci-Pe for iPhone and iPad. Turn your ingredients into personalized meals with AI-powered recipe generation. Plans from $4.99. No account required to start.
          </p>

          {/* App Store Button */}
          <div className="flex justify-center mb-12">
            <a
              href={getAppStoreLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105 active:scale-95"
            >
              <div className="bg-black text-white rounded-2xl px-8 py-4 flex items-center gap-4 shadow-large hover:shadow-glow transition-shadow">
                <svg
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-2xl font-semibold">App Store</div>
                </div>
              </div>
            </a>
          </div>

          {/* Device Preview */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-large p-8">
              <div className="aspect-[9/16] max-w-xs mx-auto bg-gradient-to-br from-apricot-100 to-coral-100 rounded-3xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="flex justify-center mb-4 text-coral">
                    <Icon name="smartphone" className="w-16 h-16" />
                  </div>
                  <p className="text-pantry-400">iPhone Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Requirements */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-3 mb-8 text-center">What you need</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold text-pantry mb-2">Device Requirements</h3>
              <ul className="space-y-2 text-pantry-400">
                <li className="flex items-start gap-2">
                  <span className="text-coral mt-1">•</span>
                  <span>iPhone or iPad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coral mt-1">•</span>
                  <span>iOS 16.0 or later</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coral mt-1">•</span>
                  <span>150 MB available storage</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="font-semibold text-pantry mb-2">For Best Experience</h3>
              <ul className="space-y-2 text-pantry-400">
                <li className="flex items-start gap-2">
                  <span className="text-coral mt-1">•</span>
                  <span>Camera access for photo scanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coral mt-1">•</span>
                  <span>Internet connection for recipe generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coral mt-1">•</span>
                  <span>Notifications enabled for cooking timers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Recap */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="heading-3 mb-4">What&apos;s included</h2>
          <p className="body-lg text-pantry-400">Plans starting at $4.99. No account required.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3 text-coral">
                <Icon name={feature.icon} className="w-10 h-10" />
              </div>
              <h3 className="font-semibold text-pantry mb-2">{feature.title}</h3>
              <p className="text-sm text-pantry-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-3 mb-8 text-center">Questions?</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <h3 className="font-semibold text-pantry mb-2">{faq.question}</h3>
                <p className="text-pantry-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-br from-pantry to-pantry-600 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
            Ready to start cooking?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Download Do-Re-Ci-Pe and discover what your fridge can do.
          </p>
          <a
            href={getAppStoreLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <div className="bg-white text-pantry rounded-2xl px-8 py-4 font-semibold hover:bg-cream-100 transition-colors shadow-large">
              Get Do-Re-Ci-Pe for iOS
            </div>
          </a>
        </div>
      </Section>
    </>
  );
}

const features = [
  { icon: "camera", title: "Photo Scanning", description: "Instant ingredient recognition" },
  { icon: "target", title: "Smart Recipes", description: "Tailored to what you have" },
  { icon: "clock", title: "Cooking Timers", description: "Never overcook again" },
  { icon: "book", title: "Recipe Library", description: "Save your favorites" },
];

const faqs = [
  {
    question: "How much does Do-Re-Ci-Pe cost?",
    answer:
      "Do-Re-Ci-Pe offers three plans: DO Plan ($4.99 one-time for 50 recipe credits), RE Plan ($1.99/month unlimited), and MI Plan ($7.99/year unlimited). All plans include photo scanning, recipe generation, saving recipes, and cooking tools.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "Nope! You can start using Do-Re-Ci-Pe immediately after download. An optional account lets you sync recipes across devices.",
  },
  {
    question: "Will this work on Android?",
    answer:
      "Not yet. Do-Re-Ci-Pe is currently iOS only (iPhone and iPad). We're focusing on making the iOS experience incredible first.",
  },
  {
    question: "Does it work offline?",
    answer:
      "You'll need internet to generate new recipes, but saved recipes and timers work offline.",
  },
];
