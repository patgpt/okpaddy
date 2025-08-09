"use client";

import { MButton } from "@/ui/motion-rac";
import * as React from "react";
import { ListBox, ListBoxItem, useDragAndDrop } from "react-aria-components";
import { useAdminStore } from "../state/Provider";
import { reorderByKeys } from "./reorderUtil";

export default function MenuManager() {
  type ViewNode = {
    id: string | number;
    label: string;
    href: string;
    order: number;
  };
  const nodes = useAdminStore((s) => s.navItems);
  const setNodes = useAdminStore((s) => s.setNavItems);
  const dirty = useAdminStore((s) => s.dirty);
  const markClean = useAdminStore((s) => s.markClean);

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys: Iterable<React.Key>) =>
      [...keys].map((key) => ({ "text/plain": String(key) })),
    onReorder(e) {
      const next = reorderByKeys(nodes, new Set(e.keys), e.target);
      setNodes(next);
    },
  });

  const viewItems = React.useMemo<ViewNode[]>(
    () =>
      nodes.map((n) => ({
        id: String(n.id),
        label: n.label,
        href: n.href,
        order: n.order ?? 0,
      })),
    [nodes],
  );

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
      <ListBox<ViewNode>
        aria-label="Menu items"
        selectionMode="multiple"
        items={viewItems}
        dragAndDropHooks={dragAndDropHooks}
        className="bg-base-200 rounded-xl p-2"
      >
        {(item: ViewNode) => (
          <ListBoxItem
            id={String(item.id)}
            textValue={item.label}
            className="hover:bg-base-300 flex justify-between rounded p-2"
          >
            <div className="flex flex-col">
              <span className="font-medium">{item.label}</span>
              <span className="text-xs opacity-70">{item.href}</span>
            </div>
            <span className="text-xs opacity-70">#{item.order}</span>
          </ListBoxItem>
        )}
      </ListBox>
    </div>
  );
}
