// Structured Data component for JSON-LD SEO injection

/**
 * StructuredData Component
 * Injects JSON-LD structured data into page <head> for enhanced SEO
 * @see https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 */

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  );
}

/**
 * Schema Builders
 * Factory functions for common schema.org types
 */

export const schemas = {
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Humaneers",
    url: "https://humaneers.dev",
    logo: "https://humaneers.dev/logo.png",
    description:
      "Enterprise strategy for businesses and families. Built with precision, delivered with soul.",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Tempe",
        addressRegion: "AZ",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "El Paso",
        addressRegion: "TX",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Flint",
        addressRegion: "MI",
        addressCountry: "US",
      },
    ],
    sameAs: [
      // Add social profiles when available
      // "https://linkedin.com/company/humaneers"
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  }),

  localBusiness: (includeRating = false) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Humaneers",
    image: "https://humaneers.dev/og-image.jpg",
    description:
      "SOC 2 compliant managed IT, cybersecurity, and brand growth for businesses and families. Offices in Tempe AZ, El Paso TX, and Flint MI.",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Tempe",
        addressRegion: "AZ",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "El Paso",
        addressRegion: "TX",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Flint",
        addressRegion: "MI",
        addressCountry: "US",
      },
    ],
    priceRange: "$$$",
    ...(includeRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "200",
      },
    }),
  }),

  service: (serviceType: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    provider: {
      "@type": "Organization",
      name: "Humaneers",
    },
    areaServed: "United States",
    description,
  }),

  breadcrumb: (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  faqPage: (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),

  webpage: (name: string, description: string, url: string) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Humaneers",
      url: "https://humaneers.dev",
    },
  }),
};
