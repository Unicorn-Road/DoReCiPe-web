import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import PhoneMockup3D from "@/components/PhoneMockup3DClient";
import SwissLandscape from "@/components/SwissLandscape";
import HeroVideo from "@/components/HeroVideo";
import SeeItInAction from "@/components/SeeItInAction";
import RecipeDemo from "@/components/RecipeDemo";
import DownloadButton from "@/components/DownloadButton";
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
            It's 6pm. You open the fridge. Now what do we eat tonight?
          </h1>
          
          <p className="body-lg text-pantry-400 mb-6 max-w-2xl mx-auto">
            Take a photo of what's inside. Get a real recipe you can actually make right now. No shopping. No searching. Just dinner.
          </p>
          
          <p className="text-sm text-pantry-500 mb-8 max-w-xl mx-auto">
            Works offline. No ads. One time price. Not a subscription.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/download">
              <Button size="lg" className="w-full sm:w-auto">
                Solve dinner tonight
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See how it works
              </Button>
            </Link>
          </div>

          {/* Hero Video */}
          <HeroVideo 
            videoSrc="/videos/hero-demo.mp4"
            posterSrc="/videos/hero-demo-poster.jpg"
            creatorHandle="kristencorrao"
          />
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
                <DownloadButton location="homepage_hero_badge" />
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
                <span className="text-xs font-semibold text-pantry-300 uppercase tracking-wider">Rated by early users</span>
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
          <h2 className="heading-2 mb-4">Everything you need to figure out dinner</h2>
          <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
            Stop stressing. Start cooking. Dinner, figured out.
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

      {/* Recipe Demo */}
      <Section className="bg-gradient-to-b from-cream-50 to-white">
        <RecipeDemo />
      </Section>

      {/* See It In Action */}
      <Section className="bg-white">
        <SeeItInAction />
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works" className="bg-white">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Three steps to dinner</h2>
          <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
            No setup. No planning. No internet required. Just dinner.
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

          {/* 3D iPhone Mockup */}
          <div className="relative flex justify-center overflow-hidden">
            {/* Decorative blob backing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-gradient-to-tr from-coral-200/30 to-pantry-100/50 rounded-full blur-3xl -z-10"></div>
            
            <PhoneMockup3D
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
          <h2 className="heading-2 mb-4">No more fridge panic at 6pm</h2>
          <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
            Real people solving real dinner problems.
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
            Skip the grocery run. Cook what you already have.
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-6">
            $4.99 one time. No subscription.
          </p>
          <DownloadButton location="homepage_final_cta" variant="white" />
          <p className="mt-6 text-white/70 text-sm">
            One saved dinner pays for it.
          </p>
        </div>
      </Section>
    </>
  );
}

// Data
const features = [
  {
    icon: "clipboard",
    title: "Built by a parent",
    description: "Made by a dad of four who gets it. No ads. One time price. Not a subscription.",
  },
  {
    icon: "camera",
    title: "Take a quick photo",
    description: "Snap your fridge in 5 seconds. The app understands what you actually have.",
  },
  {
    icon: "target",
    title: "Get custom recipes instantly",
    description: "Recipes made for your exact ingredients. What you actually have right now.",
  },
  {
    icon: "lightning",
    title: "Everything stays on your phone",
    description: "Works offline. No internet required. Your recipes and photos stay on your phone.",
  },
  {
    icon: "book",
    title: "Save and share recipes",
    description: "Found something your kids ate? Save it. Share it with friends. Make it again next week.",
  },
  {
    icon: "calendar",
    title: "Waste less food",
    description: "Use what's already there. Stop throwing things away. Stop ordering takeout you don't need.",
  },
];

const steps = [
  {
    title: "Take a photo",
    description: "Snap your fridge, pantry, or even that random bag of groceries you forgot about.",
  },
  {
    title: "Get your recipe",
    description: "Instantly see what you can make. Real recipes. Real food. Ready in minutes.",
  },
  {
    title: "Make dinner",
    description: "Follow the steps. Cook. Done. You just solved the 6pm problem.",
  },
];

const testimonials = [
  {
    quote: "I used to stare at my fridge for 20 minutes. Now I just open Do-Re-Ci-Pe and dinner's done.",
    author: "Sarah",
  },
  {
    quote: "This app has saved me so much money on groceries. I'm finally using what I buy!",
    author: "Marcus",
  },
  {
    quote: "The vibe is perfect: helpful without being preachy. It's like having a friend in the kitchen.",
    author: "Jen",
  },
];
