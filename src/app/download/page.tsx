import { Metadata } from "next";
import Section from "@/components/Section";
import Icon from "@/components/Icon";
import { getAppStoreLink } from "@/lib/utils";
import DownloadButton from "@/components/DownloadButton";
import PhoneMockup from "@/components/PhoneMockup";

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
          
          <h1 className="heading-1 mb-6">Get the app that cooks with what you have</h1>
          
          <p className="body-lg text-pantry-400 mb-12">
            Do-Re-Ci-Pe for iPhone and iPad turns your ingredients into personalized recipes using AI. Photo recognition, meal planning, and cooking guidance. Plans from $4.99. No account required.
          </p>

          {/* App Store Button */}
          <div className="flex justify-center mb-12">
            <DownloadButton location="download_page_hero" />
          </div>

          {/* iPhone Carousel */}
          <div className="relative flex justify-center">
            {/* Decorative blob backing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[500px] bg-gradient-to-tr from-coral-200/30 to-pantry-100/50 rounded-full blur-3xl -z-10"></div>
            
            <PhoneMockup 
              screenshots={[
                "/screenshots/01-mobile.png",
                "/screenshots/02-mobile.png",
                "/screenshots/03-mobile.png",
                "/screenshots/04-mobile.png",
                "/screenshots/05-mobile.png"
              ]}
            />
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
          <DownloadButton location="download_page_cta" variant="white" />
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
