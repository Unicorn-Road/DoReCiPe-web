import { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built by a dad for real households. Learn the story behind Do-Re-Ci-Pe and why we're on a mission to bring back good kitchen vibes.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-cream-50 to-cream">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="heading-1 mb-6">Built by a dad, for real households</h1>
          <p className="body-lg text-pantry-400">
            Do-Re-Ci-Pe was born from standing in front of the fridge at 5:47 PM, 
            wondering what&apos;s for dinner.
          </p>
        </div>
      </Section>

      {/* Story */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <h2 className="heading-3 mb-6">The &ldquo;Fridge Stare&rdquo; is real</h2>
            
            <p className="body-lg text-charcoal mb-6">
              You know the moment: you open the fridge, stare at the ingredients, 
              close it, check your phone for recipe ideas, get overwhelmed by options, 
              and suddenly you&apos;re ordering takeout again.
            </p>

            <p className="body-lg text-charcoal mb-6">
              That was me. Every night. As a parent trying to feed my family, I realized 
              the problem wasn&apos;t cooking; it was deciding. The endless scroll through
              recipe sites. The mental math of &quot;do I have enough of this?&quot; The guilt of 
              ingredients going bad.
            </p>

            <p className="body-lg text-charcoal mb-6">
              So I built Do-Re-Ci-Pe. Not as another recipe database, but as a genuine 
              kitchen sidekick. Something that would look at what I actually had and tell 
              me what I could make. No searching. No filtering. No fuss.
            </p>

            <h2 className="heading-3 mb-6 mt-12">Why &ldquo;Do-Re-Ci-Pe&rdquo;?</h2>

            <p className="body-lg text-charcoal mb-6">
              When we sing, we begin with do re mi. When we cook, we begin with Do-Re-Ci-Pe. 
              It&apos;s about finding your rhythm in the kitchen: that flow state where
              dinner just happens without the stress.
            </p>

            <p className="body-lg text-charcoal mb-6">
              The name is a little playful, a little musical, and hopefully memorable enough 
              that you&apos;ll think of us next time you&apos;re stuck at dinnertime.
            </p>

            <h2 className="heading-3 mb-6 mt-12">Our philosophy</h2>

            <div className="space-y-4">
              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Real kitchens, real food</h3>
                <p className="text-pantry-400">
                  We design for how people actually cook, not how Instagram says they should.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Warm, not robotic</h3>
                <p className="text-pantry-400">
                  Technology should feel human. Our voice is your friend in the kitchen, 
                  not a machine.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Useful, not complicated</h3>
                <p className="text-pantry-400">
                  Every feature earns its place by making dinner genuinely easier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-2 mb-6">Our mission</h2>
          <p className="body-lg text-pantry-400 mb-8">
            Restore rhythm, confidence, and joy to everyday cooking. Transform kitchen 
            chaos into clarity. Help people cook with what they have, not what they wish 
            they bought.
          </p>
          <p className="text-2xl font-serif text-pantry italic">
            &ldquo;It&apos;s not just an app. It&apos;s a vibe shift.&rdquo;
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">What we believe</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4 text-coral">
                <Icon name={value.icon} className="w-12 h-12" />
              </div>
              <h3 className="heading-4 mb-3">{value.title}</h3>
              <p className="body-base text-pantry-400">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-coral to-coral-400 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
            Join us in the kitchen
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Be part of the movement to bring back good kitchen vibes.
          </p>
          <Link href="/download">
            <Button 
              size="lg" 
              className="bg-white text-coral hover:bg-cream-100"
            >
              Download Do-Re-Ci-Pe
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}

const values = [
  {
    icon: "home",
    title: "Made for Real Life",
    description:
      "We design for messy kitchens, busy schedules, and ingredients that are almost expired.",
  },
  {
    icon: "heart",
    title: "Reduce Food Waste",
    description:
      "Every recipe generated is one less ingredient thrown away. Your fridge has more potential than you think.",
  },
  {
    icon: "sparkles",
    title: "Creativity Without Stress",
    description:
      "Cooking should be creative and fun, not another source of daily anxiety.",
  },
];
