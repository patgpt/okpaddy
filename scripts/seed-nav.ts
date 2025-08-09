#!/usr/bin/env bun
// Allow self-signed chain during local CLI runs (Supabase)
process.env.NODE_TLS_REJECT_UNAUTHORIZED =
  process.env.NODE_TLS_REJECT_UNAUTHORIZED || "0";
import { db } from "@/db/client";
import { menus, navItems } from "@/db/schema";
import "dotenv/config"; // load .env.local before importing db
import { eq } from "drizzle-orm";

async function main() {
  // Ensure a menu exists
  const existing = await db.select().from(menus).where(eq(menus.name, "main"));
  let menuId: number;
  if (existing.length === 0) {
    const [created] = await db
      .insert(menus)
      .values({ name: "main" })
      .returning();
    menuId = created.id as unknown as number;
    console.log("Created menu", menuId);
  } else {
    menuId = existing[0].id as unknown as number;
    console.log("Using existing menu", menuId);
  }

  // Seed nav items only if empty for this menu
  const current = await db
    .select()
    .from(navItems)
    .where(eq(navItems.menuId, menuId));
  if (current.length > 0) {
    console.log("Nav items already exist, skipping. Count:", current.length);
    return;
  }

  const items = [
    { label: "Home", href: "/", order: 0 },
    { label: "Services", href: "/services", order: 1 },
    { label: "Blog", href: "/blog", order: 2 },
    { label: "Contact", href: "/contact", order: 3 },
  ];

  await db.insert(navItems).values(items.map((i) => ({ ...i, menuId })));
  console.log("Seeded nav items:", items.length);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
