export default function SchemaTags() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Do-Re-Ci-Pe",
          "applicationCategory": "LifestyleApplication",
          "operatingSystem": "iOS",
          "offers": {
            "@type": "Offer",
            "price": "4.99",
            "priceCurrency": "USD"
          },
          "description": "A kitchen sidekick that makes dinner easier, smarter, and way more fun. Take a photo of your fridge and we'll handle the hard part.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "ratingCount": "120"
          },
          "author": {
            "@type": "Organization",
            "name": "Do-Re-Ci-Pe",
            "url": "https://dorecipe.app"
          }
        })
      }}
    />
  );
}
