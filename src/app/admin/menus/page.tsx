import { db } from "@/db/client";
import { navItems } from "@/db/schema";
import type { AdminState } from "../state/createAdminStore";
import { AdminStoreProvider } from "../state/Provider";
import MenuManager from "./MenuManager";

export const dynamic = "force-dynamic";

export default async function Page() {
  let items: Array<{ id: number; label: string; href: string; order: number }> =
    [];
  try {
    const rows = await db.select().from(navItems).orderBy(navItems.order);
    items = rows.map((i) => ({
      id: i.id,
      label: i.label,
      href: i.href,
      order: i.order ?? 0,
    }));
  } catch (err) {
    console.error("Failed to load nav_items. Did you run migrations?", err);
  }
  return (
    <AdminStoreProvider
      initialState={{
        navItems: items as unknown as AdminState["navItems"],
      }}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-2xl">Menu</h1>
        {items.length === 0 && (
          <p className="alert alert-warning">
            No menu items yet or database tables not created. Run migrations to
            create tables.
          </p>
        )}
      </div>
      <MenuManager />
    </AdminStoreProvider>
  );
}
