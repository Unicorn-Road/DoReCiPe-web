import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// Heading font: Inter - Modern geometric sans with excellent legibility
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Body font: Source Serif 4 - Elegant serif with warmth and readability
const sourceSerif = Source_Serif_4({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Do-Re-Ci-Pe | Your Kitchen's New Rhythm",
    template: "%s | Do-Re-Ci-Pe",
  },
  description:
    "A kitchen sidekick that makes dinner easier, smarter, and way more fun. Take a photo of your fridge and we'll handle the hard part. iOS only.",
  keywords: [
    "recipe app",
    "cooking app",
    "meal planning",
    "AI recipes",
    "fridge to recipe",
    "dinner ideas",
    "iOS cooking app",
  ],
  authors: [{ name: "Do-Re-Ci-Pe" }],
  creator: "Do-Re-Ci-Pe",
  publisher: "Do-Re-Ci-Pe",
  metadataBase: new URL("https://dorecipe.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dorecipe.app",
    siteName: "Do-Re-Ci-Pe",
    title: "Do-Re-Ci-Pe | Your Kitchen's New Rhythm",
    description:
      "A kitchen sidekick that makes dinner easier, smarter, and way more fun. Take a photo of your fridge and we'll handle the hard part.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Do-Re-Ci-Pe - Your Kitchen's New Rhythm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Do-Re-Ci-Pe | Your Kitchen's New Rhythm",
    description:
      "A kitchen sidekick that makes dinner easier, smarter, and way more fun.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Do-Re-Ci-Pe",
  },
  other: {
    "apple-itunes-app": "app-id=6745566524",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="antialiased">
        <GoogleAnalytics gaId="G-NTLV4SJLQS" />
        <Header />
        <main className="min-h-screen pt-16 sm:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
