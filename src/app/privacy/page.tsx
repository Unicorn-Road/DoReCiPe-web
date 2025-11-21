import { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Do-Re-Ci-Pe collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <Section className="pt-12 sm:pt-20 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-1 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <div className="body-base text-pantry-400">
            <p>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>

          <section>
            <h2 className="heading-3 mb-4">Our Commitment</h2>
            <p className="body-base text-charcoal">
              At Do-Re-Ci-Pe, we take your privacy seriously. This policy explains what data 
              we collect, how we use it, and your rights regarding your information. We keep it 
              simple because privacy policies shouldn&apos;t require a law degree to understand.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">What We Collect</h2>
            
            <div className="space-y-4">
              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Photos You Take</h3>
                <p className="text-pantry-400">
                  When you snap a photo of your fridge, pantry, or receipts, we process those 
                  images to identify ingredients. Photos are only used for recipe generation 
                  and are not stored permanently unless you choose to save a recipe.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Recipe Data</h3>
                <p className="text-pantry-400">
                  Recipes you save, ingredients you mark, and cooking preferences help us 
                  personalize your experience. This data stays on your device unless you 
                  create an account for cross-device syncing.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Usage Information</h3>
                <p className="text-pantry-400">
                  We collect anonymous usage data (like which features you use most) to improve 
                  the app. This data cannot be traced back to you personally.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-pantry mb-2">Device Information</h3>
                <p className="text-pantry-400">
                  Basic device data (iOS version, device type) helps us optimize performance 
                  and fix bugs.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="heading-3 mb-4">What We DON&apos;T Collect</h2>
            <ul className="list-disc pl-6 space-y-2 body-base text-charcoal">
              <li>We don&apos;t sell your data. Ever.</li>
              <li>We don&apos;t track your location.</li>
              <li>We don&apos;t require personal information to use the app.</li>
              <li>We don&apos;t share your photos with third parties.</li>
              <li>We don&apos;t use your data for advertising.</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2 body-base text-charcoal">
              <li><strong>Recipe Generation:</strong> Your photos are processed by AI to identify ingredients and create recipes.</li>
              <li><strong>Personalization:</strong> We learn your preferences to suggest better recipes over time.</li>
              <li><strong>App Improvement:</strong> Anonymous usage data helps us fix bugs and build better features.</li>
              <li><strong>Account Services:</strong> If you create an account, we use your email to sync data and send important updates.</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Data Storage & Security</h2>
            <p className="body-base text-charcoal">
              Your data is stored securely using industry-standard encryption. Recipe data lives 
              primarily on your device. If you use an account, synced data is encrypted in transit 
              and at rest on our servers.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2 body-base text-charcoal">
              <li><strong>Access:</strong> You can view all your saved recipes and data in the app.</li>
              <li><strong>Delete:</strong> Delete individual recipes or your entire account anytime from settings.</li>
              <li><strong>Export:</strong> Export your saved recipes in a standard format.</li>
              <li><strong>Opt-Out:</strong> Disable analytics data collection in app settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Third-Party Services</h2>
            <p className="body-base text-charcoal">
              We use trusted third-party services for specific functions:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-base text-charcoal mt-4">
              <li><strong>AI Processing:</strong> Photos are processed using secure AI services to identify ingredients.</li>
              <li><strong>Analytics:</strong> Anonymous usage data helps us understand how people use the app.</li>
              <li><strong>Cloud Storage:</strong> If you create an account, recipe data is stored on secure cloud servers.</li>
            </ul>
            <p className="body-base text-charcoal mt-4">
              All third-party services are GDPR and CCPA compliant.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Children&apos;s Privacy</h2>
            <p className="body-base text-charcoal">
              Do-Re-Ci-Pe is designed for general audiences. We do not knowingly collect data 
              from children under 13. If you believe a child has provided us with personal 
              information, please contact us and we&apos;ll delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Changes to This Policy</h2>
            <p className="body-base text-charcoal">
              We may update this policy occasionally. When we do, we&apos;ll notify you in the 
              app and update the &ldquo;Last updated&rdquo; date above. Continued use of Do-Re-Ci-Pe 
              after changes means you accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="heading-3 mb-4">Contact Us</h2>
            <p className="body-base text-charcoal">
              Questions about privacy? We&apos;re here to help.
            </p>
            <div className="card mt-4">
              <p className="text-pantry-400">
                <strong>Email:</strong> privacy@dorecipe.app<br />
                <strong>Response time:</strong> Usually within 48 hours
              </p>
            </div>
          </section>

          <section className="bg-apricot-50 p-6 rounded-2xl">
            <h3 className="font-semibold text-pantry mb-3">The Short Version</h3>
            <p className="text-pantry-400">
              We only collect what we need to make Do-Re-Ci-Pe work well. Your photos are 
              processed to generate recipes. Your data stays on your device unless you choose 
              to sync. We never sell your information. You can delete everything anytime.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
