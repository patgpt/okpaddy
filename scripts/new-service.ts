#!/usr/bin/env bun
import { promises as fs } from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: bun scripts/new-service.ts <slug>");
  process.exit(1);
}
const title = slug
  .split("-")
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join(" ");

const tpl = `---
title: ${title}
slug: ${slug}
summary: TODO summary in one punchy sentence.
heroImage: /content/media/services/${slug}/hero.webp
heroAlt: ${title} hero image
published: true
categories: []
keywords: []
personas: []
problems: []
outcomes: []
features: []
process: []
packages: []
faqsRef: /content/partials/service-faqs.mdx
ctaLabel: Book a consult
ctaHref: /contact
schemaType: ProfessionalService
---

<Lead>
Write a short, confident opener that promises a result, not a feature.
</Lead>

<Section title="What you get">
  <Checklist items={frontmatter.features} />
</Section>

<Section title="Process">
  {/* map process steps here */}
</Section>

<FAQ src={frontmatter.faqsRef} />

<CTA href={frontmatter.ctaHref}>{frontmatter.ctaLabel}</CTA>
`;

const file = path.join(process.cwd(), "content/services", `${slug}.mdx`);
await fs.mkdir(path.dirname(file), { recursive: true });
await fs.writeFile(file, tpl, "utf-8");
console.log("Created", file);
