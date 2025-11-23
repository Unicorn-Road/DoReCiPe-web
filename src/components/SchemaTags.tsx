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
          "applicationSubCategory": "Recipe & Cooking App",
          "operatingSystem": "iOS",
          "offers": {
            "@type": "Offer",
            "price": "4.99",
            "priceCurrency": "USD"
          },
          "description": "AI recipe app that turns your ingredients into personalized meals. Snap a photo of your fridge, pantry, or grocery receipt and get instant recipe suggestions using exactly what you have. Features include photo ingredient recognition, meal planning, cooking timers, and smart grocery lists.",
          "featureList": [
            "AI-powered ingredient recognition from photos",
            "Personalized recipe generation",
            "Meal planning calendar",
            "Smart grocery lists",
            "Cooking timers and step-by-step guidance",
            "Recipe library with favorites"
          ],
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
