import { mdxComponents } from "@/components/mdx/registry";
import ServiceBody from "@/components/ServiceBody";
import { allServices } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { ServiceJsonLd } from "./opengraph-jsonld";

export const dynamicParams = false;

export async function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = allServices.find((d) => d.slug === slug);
  if (!doc) return {};
  return {
    title: `${doc.title} | okpaddy`,
    description: doc.summary,
    alternates: { canonical: doc.url },
    openGraph: {
      title: doc.title,
      description: doc.summary,
      url: doc.url,
      images: doc.heroImage
        ? [{ url: doc.heroImage, alt: doc.heroAlt ?? doc.title }]
        : [],
      type: "article",
    },
  } as const;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = allServices.find((d) => d.slug === slug);
  if (!doc) return notFound();
  return (
    <article className="prose max-w-none px-6 py-16">
      <ServiceJsonLd slug={doc.slug} />
      <header className="mb-8">
        <h1>{doc.title}</h1>
        {doc.tagline ? (
          <p className="text-xl opacity-80">{doc.tagline}</p>
        ) : null}
      </header>
      <ServiceBody code={doc.body.code} components={mdxComponents} />
    </article>
  );
}
