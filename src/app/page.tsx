import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import PhoneMockup from "@/components/PhoneMockup";
import SwissLandscape from "@/components/SwissLandscape";
import FacebookReelEmbed from "@/components/FacebookReelEmbed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Do-Re-Ci-Pe | AI Recipe App Using Your Ingredients",
  description: "AI recipe app that turns your ingredients into personalized meals. Snap a photo of your fridge, get instant recipes with what you have. No wasted food, no extra shopping. iOS app.",
  alternates: {
    canonical: "https://dorecipe.app",
  },
  openGraph: {
    type: "website",
    url: "https://dorecipe.app",
    title: "Do-Re-Ci-Pe | Your Kitchen's New Rhythm",
    description: "A kitchen sidekick that makes dinner easier, smarter, and way more fun. Take a photo of your fridge and we'll handle the hard part.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Do-Re-Ci-Pe",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
        <SwissLandscape />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="badge badge-secondary">iOS Only · Available Now</span>
          </div>
          
          <h1 className="heading-1 mb-6 text-balance">
            Your Ingredients. Instant Recipes. Zero Waste.
          </h1>
          
          <p className="text-xl font-serif text-pantry-400 mb-4 italic">
            When we cook, we begin with Do-Re-Ci-Pe
          </p>
          
          <p className="body-lg text-pantry-400 mb-8 max-w-2xl mx-auto">
            Snap a photo of your fridge, pantry, or grocery receipt. Get personalized recipes instantly using exactly what you have—no missing ingredients, no wasted food, no stress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/download">
              <Button size="lg" className="w-full sm:w-auto">
                Get Do-Re-Ci-Pe
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See the Magic
              </Button>
            </Link>
          </div>

          {/* Video Demo (Replaced PhoneMockup) */}
          <div className="relative max-w-3xl mx-auto">
            <div className="transform hover:scale-105 transition-transform duration-500">
              <FacebookReelEmbed 
                videoUrl="https://www.instagram.com/reel/DRDWHViDXPS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" 
                className="transform rotate-0 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Social Proof - Clean & Authoritative */}
      <Section className="py-16 bg-cream-50 border-y border-cream-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-16">
            
            {/* App Identity */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-[1.5rem] shadow-soft overflow-hidden bg-white ring-1 ring-black/5">
                <img src="/icon.png" alt="Do-Re-Ci-Pe App Icon" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-2xl font-bold text-pantry font-serif mb-1">Do-Re-Ci-Pe</h3>
                <p className="text-pantry-400 mb-3">Your kitchen sidekick</p>
                <a href="/download" className="transition-opacity hover:opacity-80">
                  <img 
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1234567890" 
                    alt="Download on the App Store" 
                    className="h-10 w-auto"
                  />
                </a>
              </div>
            </div>

            {/* Stats Divider (Desktop) */}
            <div className="hidden md:block w-px h-20 bg-cream-300"></div>

            {/* Stats Group */}
            <div className="flex items-center gap-12 sm:gap-16">
              
              {/* 5.0 Rating */}
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-pantry mb-1 font-sans tracking-tight">5.0</div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-coral text-lg">★</span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-pantry-300 uppercase tracking-wider">Average Rating</span>
              </div>

              {/* #4 Ranking */}
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-pantry mb-1 font-sans tracking-tight">#4</div>
                <div className="text-base font-bold text-pantry mb-1">Food & Drink</div>
                <span className="text-xs font-semibold text-pantry-300 uppercase tracking-wider">Top Charts</span>
              </div>

            </div>

          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Your fridge is more capable than it looks</h2>
          <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
            Do-Re-Ci-Pe transforms kitchen chaos into clarity with features that feel like magic.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-4 text-coral">
                <Icon name={feature.icon} className="w-14 h-14" />
              </div>
              <h3 className="heading-4 mb-3">{feature.title}</h3>
              <p className="body-base text-pantry-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/features">
            <Button variant="outline" size="lg">
              See All Features
            </Button>
          </Link>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works" className="bg-white">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Dinner without the drama</h2>
          <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
            No searching, no filtering, no fuss. Just photos, recipes, and better kitchen vibes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
          {/* Steps */}
          <div className="space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start text-left group">
                <div className="flex-shrink-0 w-14 h-14 bg-coral rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-glow group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                <div>
                  <h3 className="heading-4 mb-2">{step.title}</h3>
                  <p className="body-base text-pantry-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Screenshot Gallery (Replaced Video) */}
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

      {/* Testimonials */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">This app gets me</h2>
          <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
            Real people, real kitchens, real good vibes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-coral text-xl">★</span>
                ))}
              </div>
              <p className="body-base text-charcoal mb-4 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="text-sm text-pantry-400">
                – {testimonial.author}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-br from-coral to-coral-400 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Bring back the good kitchen vibes
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-8">
            Your fridge has ideas. Let&apos;s see what we can make.
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
const features = [
  {
    icon: "camera",
    title: "Snap & Cook",
    description: "Take a photo of your fridge, pantry, or receipts. We'll figure out what you have and what you can make.",
  },
  {
    icon: "target",
    title: "Smart Recipes",
    description: "Get recipes tailored to your actual ingredients, not an idealized Pinterest version of cooking.",
  },
  {
    icon: "calendar",
    title: "Meal Planning",
    description: "Plan your week ahead with smart meal suggestions. Organize recipes by day and never wonder what's for dinner.",
  },
  {
    icon: "clipboard",
    title: "Shopping Lists",
    description: "Automatically generate shopping lists from recipes. Check off items as you shop and never forget an ingredient.",
  },
  {
    icon: "lightning",
    title: "Kitchen Sidekick",
    description: "Cooking timers, smart tips, reheating advice: all the little helpers that make dinner less stressful.",
  },
  {
    icon: "book",
    title: "Recipe Library",
    description: "Save your favorites and build your personal cookbook. Everything you need, nothing you don't.",
  },
];

const steps = [
  {
    title: "Take a photo",
    description: "Snap your fridge, pantry, receipt, or cookbook. We'll read it and know what you've got.",
  },
  {
    title: "See what's possible",
    description: "We'll suggest recipes you can actually make with what you have, no extra shopping required.",
  },
  {
    title: "Cook with confidence",
    description: "Follow step-by-step instructions with timers and tips. Dinner? Sorted.",
  },
];

const testimonials = [
  {
    quote: "I used to stare at my fridge for 20 minutes. Now I just open Do-Re-Ci-Pe and dinner's done.",
    author: "Sarah, Parent & Fridge Stare Survivor",
  },
  {
    quote: "This app has saved me so much money on groceries. I'm finally using what I buy!",
    author: "Marcus, budget-conscious cook",
  },
  {
    quote: "The vibe is perfect: helpful without being preachy. It's like having a friend in the kitchen.",
    author: "Jen, cooking enthusiast",
  },
];
