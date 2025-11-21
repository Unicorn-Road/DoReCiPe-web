"use client";

import { Metadata } from "next";
import { useState } from "react";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Link from "next/link";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Create mailto link with form data
    const mailtoLink = `mailto:support@dorecipe.app?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Reset form after short delay
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-pantry font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-pantry font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-pantry font-medium mb-2"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all bg-white"
              >
                <option value="">Select a topic</option>
                <option value="General Question">General Question</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Account Help">Account Help</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-pantry font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Opening email client..."
                  : status === "sent"
                  ? "Email client opened!"
                  : "Send Message"}
              </Button>
              {status === "sent" && (
                <p className="text-sm text-green-600 mt-2 text-center">
                  Your email client should open. If not, email us at support@dorecipe.app
                </p>
              )}
            </div>
          </form>

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
