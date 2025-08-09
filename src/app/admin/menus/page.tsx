import { db } from "@/db/client";
import { navItems } from "@/db/schema";
import type { AdminState } from "../state/createAdminStore";
import { AdminStoreProvider } from "../state/Provider";
import MenuManager from "./MenuManager";

export const dynamic = "force-dynamic";

export default async function Page() {
  const items = await db.select().from(navItems).orderBy(navItems.order);
  return (
    <AdminStoreProvider
      initialState={{
        navItems: items.map((i) => ({
          id: i.id,
          label: i.label,
          href: i.href,
          order: i.order ?? 0,
        })) as unknown as AdminState["navItems"],
      }}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-2xl">Menu</h1>
      </div>
      <MenuManager />
    </AdminStoreProvider>
  );
}
