import { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Do-Re-Ci-Pe.",
};

export default function TermsPage() {
  return (
    <Section className="pt-12 sm:pt-20 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-1 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <div className="body-base text-pantry-400">
            <p>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>

          <section className="bg-apricot-50 p-6 rounded-2xl">
            <h3 className="font-semibold text-pantry mb-3">The Human Version</h3>
            <p className="text-pantry-400">
              Use Do-Re-Ci-Pe to make cooking easier. Don&apos;t abuse it or use it for anything harmful. 
              We're not liable if a recipe doesn't turn out perfectly (cooking is an art, not a
              science. Always double-check ingredients for allergens. Be cool, and we&apos;ll be cool.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">1. Acceptance of Terms</h2>
            <p className="body-base text-charcoal">
              By downloading, installing, or using Do-Re-Ci-Pe, you agree to these Terms of Service. 
              If you don&apos;t agree, please don&apos;t use the app. These terms apply to everyone who uses 
              Do-Re-Ci-Pe, whether you create an account or not.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">2. What Do-Re-Ci-Pe Does</h2>
            <p className="body-base text-charcoal mb-4">
              Do-Re-Ci-Pe is a cooking companion app that:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-base text-charcoal">
              <li>Identifies ingredients from photos</li>
              <li>Generates personalized recipes based on available ingredients</li>
              <li>Provides cooking timers, tips, and guidance</li>
              <li>Saves and organizes your favorite recipes</li>
            </ul>
            <p className="body-base text-charcoal mt-4">
              We strive for accuracy, but ingredient recognition and recipe suggestions are powered 
              by AI and may not always be perfect.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">3. Your Responsibilities</h2>
            
            <div className="space-y-4">
              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Use It Responsibly</h3>
                <ul className="list-disc pl-6 space-y-1 text-pantry-400">
                  <li>You&apos;re responsible for verifying recipe safety and suitability</li>
                  <li>Always check for allergens and dietary restrictions</li>
                  <li>Use common sense with food handling and cooking temperatures</li>
                  <li>Don&apos;t rely solely on the app for food safety decisions</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Don&apos;t Abuse It</h3>
                <ul className="list-disc pl-6 space-y-1 text-pantry-400">
                  <li>Don&apos;t attempt to hack, reverse engineer, or misuse the app</li>
                  <li>Don&apos;t use the app for commercial purposes without permission</li>
                  <li>Don&apos;t share your account credentials if you create one</li>
                  <li>Don&apos;t upload inappropriate or harmful content</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="heading-3 mb-4">4. Food Safety & Dietary Restrictions</h2>
            <div className="bg-coral-50 p-6 rounded-2xl border-2 border-coral-200">
              <p className="font-semibold text-pantry mb-2">Important:</p>
              <ul className="list-disc pl-6 space-y-2 text-pantry-400">
                <li>Do-Re-Ci-Pe is NOT a substitute for professional dietary or medical advice</li>
                <li>Always verify ingredients for allergens, even if marked as safe</li>
                <li>Recipe nutritional information is estimated and may not be precise</li>
                <li>Consult a professional for specific dietary needs or restrictions</li>
                <li>Use proper food safety practices when cooking and storing food</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="heading-3 mb-4">5. Intellectual Property</h2>
            
            <div className="space-y-4">
              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Our Content</h3>
                <p className="text-pantry-400">
                  The Do-Re-Ci-Pe app, including its design, features, and branding, is owned by 
                  Do-Re-Ci-Pe. You can use the app, but you can&apos;t copy, modify, or redistribute it.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Your Content</h3>
                <p className="text-pantry-400">
                  Photos you upload and recipes you create belong to you. By using Do-Re-Ci-Pe, 
                  you grant us permission to process your photos to generate recipes. We don&apos;t 
                  claim ownership of your content.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Generated Recipes</h3>
                <p className="text-pantry-400">
                  Recipes generated by Do-Re-Ci-Pe are yours to use for personal purposes. Feel free to share them with
                  friends, post them online, or modify them. We only ask that you don&apos;t 
                  represent them as your own original creations if sharing publicly.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="heading-3 mb-4">6. Account & Data</h2>
            <p className="body-base text-charcoal">
              You can use Do-Re-Ci-Pe without creating an account. If you choose to create one:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-base text-charcoal mt-4">
              <li>You&apos;re responsible for keeping your login secure</li>
              <li>You can delete your account anytime from app settings</li>
              <li>Deleting your account removes all synced data from our servers</li>
              <li>Local data on your device persists until you uninstall the app</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">7. Limitations of Liability</h2>
            <p className="body-base text-charcoal">
              Do-Re-Ci-Pe is provided &ldquo;as is.&rdquo; We work hard to make it great, but:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-base text-charcoal mt-4">
              <li>We don&apos;t guarantee the app will always be available or error-free</li>
              <li>We&apos;re not liable for recipe outcomes, food poisoning, or cooking mishaps</li>
              <li>We&apos;re not responsible for allergic reactions or dietary issues</li>
              <li>Our maximum liability is limited to the amount you paid for your current plan</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">8. Changes to Service</h2>
            <p className="body-base text-charcoal">
              We may update, modify, or discontinue features of Do-Re-Ci-Pe at any time. We&apos;ll 
              try to give notice for major changes, but we can&apos;t guarantee the app will stay 
              exactly the same forever.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">9. Termination</h2>
            <p className="body-base text-charcoal">
              You can stop using Do-Re-Ci-Pe anytime by deleting the app. We reserve the right to 
              terminate or suspend access for users who violate these terms or misuse the service.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">10. Changes to Terms</h2>
            <p className="body-base text-charcoal">
              We may update these terms occasionally. When we do, we&apos;ll notify you in the app 
              and update the &ldquo;Last updated&rdquo; date. Continued use after changes means you 
              accept the new terms.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">11. Contact & Disputes</h2>
            <p className="body-base text-charcoal">
              Questions or issues? We&apos;re here to help.
            </p>
            <div className="card mt-4">
              <p className="text-pantry-400">
                <strong>Email:</strong> support@dorecipe.app<br />
                <strong>We&apos;ll respond within:</strong> 48 hours
              </p>
            </div>
            <p className="body-base text-charcoal mt-4">
              For legal disputes, we prefer to resolve things amicably. If that doesn&apos;t work, 
              disputes will be governed by the laws of [Your Jurisdiction].
            </p>
          </section>

          <section className="bg-cream-200 p-6 rounded-2xl">
            <h3 className="font-semibold text-pantry mb-3">The Bottom Line</h3>
            <p className="text-pantry-400">
              Do-Re-Ci-Pe is here to make cooking easier and more fun. Use it responsibly, 
              verify food safety yourself, and be kind. We&apos;ll do our best to keep improving 
              the app and supporting you in the kitchen. If you have questions or problems, 
              reach out. We're friendly humans who genuinely want to help.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
