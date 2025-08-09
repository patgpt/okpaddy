// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var Service = defineDocumentType(() => ({
  name: "Service",
  filePathPattern: `services/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: true },
    heroImage: { type: "string", required: false },
    heroAlt: { type: "string", required: false },
    tagline: { type: "string", required: false },
    priority: { type: "number", required: false },
    categories: { type: "list", of: { type: "string" }, required: false },
    keywords: { type: "list", of: { type: "string" }, required: false },
    published: { type: "boolean", required: true, default: true },
    updated: { type: "date", required: false },
    personas: { type: "list", of: { type: "string" }, required: false },
    problems: { type: "list", of: { type: "string" }, required: false },
    outcomes: { type: "list", of: { type: "string" }, required: false },
    features: { type: "list", of: { type: "string" }, required: false },
    process: { type: "list", of: { type: "json" }, required: false },
    packages: { type: "list", of: { type: "json" }, required: false },
    testimonials: { type: "list", of: { type: "json" }, required: false },
    faqsRef: { type: "string", required: false },
    relatedCaseStudies: {
      type: "list",
      of: { type: "string" },
      required: false
    },
    ctaLabel: { type: "string", required: false, default: "Book a consult" },
    ctaHref: { type: "string", required: false, default: "/contact" },
    schemaType: {
      type: "enum",
      options: [
        "ProfessionalService",
        "Game",
        "SoftwareApplication",
        "Service"
      ],
      required: false,
      default: "ProfessionalService"
    }
  },
  computedFields: {
    url: { type: "string", resolve: (s) => `/services/${s.slug}` },
    readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Service],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrettyCode, { theme: "github-dark" }]
    ]
  }
});
export {
  Service,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-46ACQ7FR.mjs.map
