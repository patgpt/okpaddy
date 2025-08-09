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

// Reserved custom validators for later use (intentionally unused for now)
// const slug = z.string();
// const catSlug = z.string();

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
// const PMDoc = z.object({ type: z.literal("doc"), content: z.array(PMNode).optional() });

export const MediaInsert = createInsertSchema(media);
export const MediaUpdate = createUpdateSchema(media);
export const MediaSelect = createSelectSchema(media);

export const CategoryInsert = createInsertSchema(categories);
export const CategoryUpdate = createUpdateSchema(categories);
export const CategorySelect = createSelectSchema(categories);

export const PostInsert = createInsertSchema(posts);
export const PostUpdate = createUpdateSchema(posts);
export const PostSelect = createSelectSchema(posts);

export const WorkInsert = createInsertSchema(works);
export const WorkUpdate = createUpdateSchema(works);
export const WorkSelect = createSelectSchema(works);

export const ServiceInsert = createInsertSchema(services);
export const ServiceUpdate = createUpdateSchema(services);
export const ServiceSelect = createSelectSchema(services);

export const NavItemInsert = createInsertSchema(navItems, {
  href: () =>
    z
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

// Types
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
