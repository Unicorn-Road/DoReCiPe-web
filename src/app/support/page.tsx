import { Metadata } from "next";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Link from "next/link";
import SupportForm from "@/components/SupportForm";

export const metadata: Metadata = {
  title: "Support | We're Here to Help",
  description:
    "Contact the Do-Re-Ci-Pe support team for questions, feedback, or technical assistance. We typically respond within 48 hours.",
};

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-cream-50 to-cream">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="heading-1 mb-6">We&apos;re here to help</h1>
          <p className="body-lg text-pantry-400">
            Questions, feedback, or just want to say hi? Drop us a message and we&apos;ll 
            get back to you within 48 hours.
          </p>
        </div>
      </Section>

      {/* Contact Form */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <SupportForm />

          {/* Alternative Contact */}
          <div className="mt-12 pt-8 border-t border-cream-300">
            <h3 className="heading-4 mb-4 text-center">Other ways to reach us</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@dorecipe.app"
                className="text-coral hover:text-coral-400 transition-colors text-center"
              >
                support@dorecipe.app
              </a>
              <span className="hidden sm:inline text-pantry-300">|</span>
              <a
                href="https://www.instagram.com/do.re.ci.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:text-coral-400 transition-colors text-center"
              >
                @do.re.ci.pe on Instagram
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Link */}
      <Section className="bg-apricot-50">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-3 mb-4">Looking for quick answers?</h2>
          <p className="body-lg text-pantry-400 mb-6">
            Check our FAQ page for answers to common questions about features, 
            pricing, and more.
          </p>
          <Link href="/faq">
            <Button variant="outline" size="lg">
              View FAQ
            </Button>
          </Link>
        </div>
      </Section>

      {/* Response Time */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="card text-center">
            <h3 className="heading-4 mb-3">Our commitment</h3>
            <p className="text-pantry-400 mb-4">
              We typically respond within 48 hours during business days. For urgent 
              technical issues, please include &quot;URGENT&quot; in your subject line.
            </p>
            <p className="text-sm text-pantry-300">
              Monday – Friday, 9 AM – 5 PM EST
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
