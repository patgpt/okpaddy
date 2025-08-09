/* eslint-disable @typescript-eslint/no-explicit-any */
import { allServices } from "contentlayer/generated";

export function ServiceJsonLd({ slug }: { slug: string }) {
  const doc = allServices.find((d: { slug: string }) => d.slug === slug);
  if (!doc) return null;
  const data: any = {
    "@context": "https://schema.org",
    "@type": doc.schemaType ?? "ProfessionalService",
    name: doc.title,
    description: doc.summary,
    url: `https://example.com${doc.url}`,
    areaServed: "Global",
    image: doc.heroImage,
    offers: doc.packages?.map((p: any) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: "USD",
      category: "Service",
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
