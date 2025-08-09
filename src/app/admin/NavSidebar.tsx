"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { ListBox, ListBoxItem } from "react-aria-components";

type NavItem = { id: string; label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/admin" },
  { id: "posts", label: "Posts", href: "/admin/posts" },
  { id: "works", label: "Works", href: "/admin/works" },
  { id: "services", label: "Services", href: "/admin/services" },
  { id: "categories", label: "Categories", href: "/admin/categories" },
  { id: "menus", label: "Menus", href: "/admin/menus" },
  { id: "media", label: "Media", href: "/admin/media" },
  { id: "settings", label: "Settings", href: "/admin/settings" },
];

export function NavSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const selected = React.useMemo(() => {
    const active = NAV_ITEMS.find(
      (n) => pathname === n.href || pathname?.startsWith(n.href + "/"),
    );
    return active ? new Set([active.id]) : new Set<string>();
  }, [pathname]);

  return (
    <aside className="bg-base-200 border-base-300 sticky top-0 h-dvh w-[280px] shrink-0 border-r p-3">
      <div className="mb-3 px-2 text-sm font-semibold opacity-70">Admin</div>
      <ListBox
        aria-label="Admin navigation"
        selectionMode="single"
        selectedKeys={selected}
        onAction={(key) => {
          const next = NAV_ITEMS.find((n) => n.id === String(key));
          if (next) router.push(next.href);
        }}
        className="flex flex-col gap-1"
        items={NAV_ITEMS}
      >
        {(item: NavItem) => (
          <ListBoxItem
            id={item.id}
            textValue={item.label}
            className="data-[selected]:bg-base-300 hover:bg-base-300 flex items-center gap-3 rounded-lg px-3 py-2 outline-none"
          >
            <Link href={item.href} className="flex-1">
              <span className="text-sm">{item.label}</span>
            </Link>
          </ListBoxItem>
        )}
      </ListBox>
    </aside>
  );
}
