import {
  boolean,
  foreignKey,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 160 }).default(""),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  excerpt: varchar("excerpt", { length: 280 }),
  contentRich: jsonb("content_rich").$type<unknown>(),
  coverId: integer("cover_id").references(() => media.id, {
    onDelete: "set null",
  }),
  tags: text("tags").array(),
  metaTitle: varchar("meta_title", { length: 200 }),
  metaDescription: varchar("meta_description", { length: 300 }),
  ogImageId: integer("og_image_id").references(() => media.id, {
    onDelete: "set null",
  }),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  company: varchar("company", { length: 160 }).notNull(),
  role: varchar("role", { length: 160 }).notNull(),
  startDate: varchar("start_date", { length: 10 }).notNull(),
  endDate: varchar("end_date", { length: 10 }).default("present"),
  location: varchar("location", { length: 160 }),
  summary: text("summary"),
  contentRich: jsonb("content_rich").$type<unknown>(),
  bullets: text("bullets").array(),
  tech: text("tech").array(),
  logoId: integer("logo_id").references(() => media.id, {
    onDelete: "set null",
  }),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  metaTitle: varchar("meta_title", { length: 200 }),
  metaDescription: varchar("meta_description", { length: 300 }),
  ogImageId: integer("og_image_id").references(() => media.id, {
    onDelete: "set null",
  }),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  tagline: varchar("tagline", { length: 200 }),
  description: text("description"),
  iconId: integer("icon_id").references(() => media.id, {
    onDelete: "set null",
  }),
  heroId: integer("hero_id").references(() => media.id, {
    onDelete: "set null",
  }),
  features: jsonb("features").$type<Array<{ title: string; body?: string }>>(),
  priceFrom: integer("price_from"),
  metaTitle: varchar("meta_title", { length: 200 }),
  metaDescription: varchar("meta_description", { length: 300 }),
  ogImageId: integer("og_image_id").references(() => media.id, {
    onDelete: "set null",
  }),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const menus = pgTable("menus", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const navItems = pgTable(
  "nav_items",
  {
    id: serial("id").primaryKey(),
    menuId: integer("menu_id")
      .references(() => menus.id, { onDelete: "cascade" })
      .notNull(),
    parentId: integer("parent_id"),
    label: varchar("label", { length: 160 }).notNull(),
    href: varchar("href", { length: 300 }).notNull(),
    description: varchar("description", { length: 220 }),
    iconId: integer("icon_id").references(() => media.id, {
      onDelete: "set null",
    }),
    imageId: integer("image_id").references(() => media.id, {
      onDelete: "set null",
    }),
    order: integer("order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    byMenuOrder: index("nav_items_menu_order_idx").on(t.menuId, t.order),
    uniqMenuOrder: uniqueIndex("nav_items_menu_order_uniq").on(
      t.menuId,
      t.order,
    ),
    parentFk: foreignKey({
      columns: [t.parentId],
      foreignColumns: [t.id],
      name: "nav_items_parent_fk",
    }).onDelete("set null"),
  }),
);

export const postCategories = pgTable(
  "post_categories",
  {
    postId: integer("post_id")
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: integer("category_id")
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.postId, t.categoryId] }) }),
);

export const workCategories = pgTable(
  "work_categories",
  {
    workId: integer("work_id")
      .references(() => works.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: integer("category_id")
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.workId, t.categoryId] }) }),
);

export const serviceCategories = pgTable(
  "service_categories",
  {
    serviceId: integer("service_id")
      .references(() => services.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: integer("category_id")
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.serviceId, t.categoryId] }) }),
);
