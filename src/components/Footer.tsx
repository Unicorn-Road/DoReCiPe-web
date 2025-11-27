import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Download", href: "/download" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    social: [
      { label: "Instagram", href: "https://www.instagram.com/do.re.ci.pe/" },
      { label: "Facebook", href: "https://www.facebook.com/dorecipe" },
      { label: "Support", href: "/support" },
      // { label: "TikTok", href: "https://tiktok.com/@dorecipeapp" },
      // { label: "YouTube", href: "https://youtube.com/@dorecipeapp" },
    ],
  };

  return (
    <footer className="bg-pantry text-white">
      <div className="container-custom py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/logo.png"
              alt="Do-Re-Ci-Pe Logo"
              width={120}
              height={36}
              className="h-7 w-auto brightness-0 invert"
              unoptimized
            />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Your kitchen&apos;s new rhythm. Turn the ingredients you have
              into meals you&apos;ll actually make.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-apricot transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-apricot transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Connect</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-apricot transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Do-Re-Ci-Pe. Built with good vibes.
            </p>
            <p className="text-white/60 text-sm">
              iOS only · Available on the App Store
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
