"use client";

import { MButton, MListBox } from "@/ui/motion-rac";
import { ListBoxItem } from "react-aria-components";
import { useAdminStore } from "../state/Provider";

type NavNode = {
  id: number | string;
  label: string;
  href: string;
  order: number;
};

export default function MenuManager() {
  const nodes = useAdminStore((s) => s.navItems) as unknown as NavNode[];
  const dirty = useAdminStore((s) => s.dirty);
  const markClean = useAdminStore((s) => s.markClean);

  // TODO: wire up react-aria dnd once installed; placeholder reordering via click could be added

  async function save() {
    await fetch("/api/admin/menus/reorder", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        items: nodes.map((n) => ({ id: Number(n.id), order: n.order })),
      }),
      cache: "no-store",
    });
    markClean();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MButton
          className="btn btn-primary"
          onPress={save}
          isDisabled={!dirty}
          whileTap={{ scale: 0.98 }}
        >
          Save order
        </MButton>
        {dirty && <span className="badge badge-warning">Unsaved changes</span>}
      </div>
      <MListBox
        aria-label="Menu items"
        selectionMode="multiple"
        items={
          nodes as unknown as {
            id: string | number;
            label: string;
            href: string;
            order: number;
          }[]
        }
        className="bg-base-200 rounded-xl p-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {(item) => {
          const n = item as unknown as NavNode;
          return (
            <ListBoxItem
              id={String(n.id)}
              textValue={n.label}
              className="hover:bg-base-300 flex justify-between rounded p-2"
            >
              <div className="flex flex-col">
                <span className="font-medium">{n.label}</span>
                <span className="text-xs opacity-70">{n.href}</span>
              </div>
              <span className="text-xs opacity-70">#{n.order}</span>
            </ListBoxItem>
          );
        }}
      </MListBox>
    </div>
  );
}
