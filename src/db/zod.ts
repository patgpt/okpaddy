import {
  categories,
  media,
  navItems,
  postCategories,
  posts,
  serviceCategories,
  services,
  workCategories,
  works,
} from "@/db/schema";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

// Common validators
const slug = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9-]+$/);
const catSlug = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9-]+$/);

// ProseMirror JSON (TipTap)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PMNode: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.string(), z.unknown()).optional(),
    text: z.string().optional(),
    marks: z.array(z.record(z.string(), z.unknown())).optional(),
    content: z.array(PMNode).optional(),
  }),
);
const PMDoc = z.object({
  type: z.literal("doc"),
  content: z.array(PMNode).optional(),
});

export const MediaInsert = createInsertSchema(media, {
  url: z.string().url(),
  alt: z.string().max(160).optional(),
});
export const MediaUpdate = createUpdateSchema(media);
export const MediaSelect = createSelectSchema(media);

export const CategoryInsert = createInsertSchema(categories, {
  slug: catSlug,
  name: z.string().min(2).max(160),
});
export const CategoryUpdate = createUpdateSchema(categories);
export const CategorySelect = createSelectSchema(categories);

export const PostInsert = createInsertSchema(posts, {
  slug: slug,
  excerpt: z.string().max(280).optional(),
  tags: z.array(z.string().transform((s) => s.trim().toLowerCase())).optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(300).optional(),
  publishedAt: z.union([z.date(), z.string().datetime()]).nullable().optional(),
  contentRich: PMDoc.nullish(),
});
export const PostUpdate = createUpdateSchema(posts, {
  contentRich: () => PMDoc.nullish(),
});
export const PostSelect = createSelectSchema(posts);

export const WorkInsert = createInsertSchema(works, {
  startDate: z.string().regex(/^\d{4}-\d{2}$/),
  endDate: z
    .string()
    .regex(/^present$|^\d{4}-\d{2}$/)
    .optional(),
  bullets: z.array(z.string()).max(12).optional(),
  tech: z.array(z.string()).optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(300).optional(),
  publishedAt: z.union([z.date(), z.string().datetime()]).nullable().optional(),
  contentRich: PMDoc.nullish(),
});
export const WorkUpdate = createUpdateSchema(works, {
  contentRich: () => PMDoc.nullish(),
});
export const WorkSelect = createSelectSchema(works);

export const ServiceInsert = createInsertSchema(services, {
  slug: slug,
  features: z
    .array(z.object({ title: z.string().min(2), body: z.string().optional() }))
    .optional(),
  priceFrom: z.number().int().nonnegative().optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(300).optional(),
});
export const ServiceUpdate = createUpdateSchema(services);
export const ServiceSelect = createSelectSchema(services);

export const NavItemInsert = createInsertSchema(navItems, {
  href: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().url().or(z.string().startsWith("/")))
    .refine((v) => !/^javascript:/i.test(v), "Invalid href"),
});
export const NavItemUpdate = createUpdateSchema(navItems);
export const NavItemSelect = createSelectSchema(navItems);

export const PostCategoryInsert = createInsertSchema(postCategories);
export const WorkCategoryInsert = createInsertSchema(workCategories);
export const ServiceCategoryInsert = createInsertSchema(serviceCategories);

// Types (import these everywhere)
export type TPost = z.infer<typeof PostSelect>;
export type TWork = z.infer<typeof WorkSelect>;
export type TService = z.infer<typeof ServiceSelect>;
export type TCategory = z.infer<typeof CategorySelect>;
export type TNavItem = z.infer<typeof NavItemSelect>;
export type TMedia = z.infer<typeof MediaSelect>;

export type TPostInsert = z.infer<typeof PostInsert>;
export type TWorkInsert = z.infer<typeof WorkInsert>;
export type TServiceInsert = z.infer<typeof ServiceInsert>;
export type TNavItemInsert = z.infer<typeof NavItemInsert>;
export type TCategoryInsert = z.infer<typeof CategoryInsert>;
