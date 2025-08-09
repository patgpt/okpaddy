import { TNavItem } from "@/db/zod";

export function reorderByKeys(
  list: (TNavItem & { order: number })[],
  keys: Set<React.Key>,
  target: { key: React.Key; dropPosition: "before" | "after" | "on" },
) {
  const moving = list.filter((i) => keys.has(String(i.id)));
  const staying = list.filter((i) => !keys.has(String(i.id)));
  const idx = staying.findIndex((i) => String(i.id) === String(target.key));
  const insertIndex =
    target.dropPosition === "after" ? idx + 1 : Math.max(idx, 0);
  const next = [
    ...staying.slice(0, insertIndex),
    ...moving,
    ...staying.slice(insertIndex),
  ];
  return next.map((n, i) => ({ ...n, order: i }));
}
