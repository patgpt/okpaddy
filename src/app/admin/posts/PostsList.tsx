"use client";

import { MButton } from "@/ui/motion-rac";
import * as React from "react";
import {
  ComboBox,
  Input as ComboInput,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { z } from "zod";

type PostRow = {
  id: number;
  title: string;
  slug: string;
  publishedAt: string | null;
  updatedAt: string | null;
};

async function fetchPage(
  cursor: number | null,
  limit = 20,
  categoryId?: string | null,
) {
  const url = new URL("/api/admin/posts/list", window.location.origin);
  url.searchParams.set("limit", String(limit));
  if (cursor) url.searchParams.set("cursor", String(cursor));
  if (categoryId) url.searchParams.set("categoryId", categoryId);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load");
  return (await res.json()) as { data: PostRow[]; nextCursor: number | null };
}

export default function PostsList() {
  const [items, setItems] = React.useState<PostRow[]>([]);
  const [cursor, setCursor] = React.useState<number | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [cats, setCats] = React.useState<{ id: number; name: string }[]>([]);
  const [selectedCat, setSelectedCat] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    if (!inputValue) return items;
    const q = inputValue.toLowerCase();
    return items.filter((p) =>
      [p.title, p.slug].some((s) => s?.toLowerCase().includes(q)),
    );
  }, [items, inputValue]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setBusy(true);
      try {
        const url = new URL("/api/admin/categories", window.location.origin);
        const [pageRes, catsRes] = await Promise.all([
          fetchPage(null, 20, selectedCat ?? undefined),
          fetch(url.toString(), { cache: "no-store" }),
        ]);
        const { data, nextCursor } = pageRes;
        const Cat = z.object({ id: z.number().int(), name: z.string() });
        const catRows = z.array(Cat).parse(await catsRes.json());
        if (!mounted) return;
        setItems(data);
        setCursor(nextCursor);
        setCats(catRows);
      } finally {
        if (mounted) setBusy(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [selectedCat]);

  async function loadMore() {
    if (!cursor || busy) return;
    setBusy(true);
    try {
      const { data, nextCursor } = await fetchPage(
        cursor,
        20,
        selectedCat ?? undefined,
      );
      setItems((prev) => [...prev, ...data]);
      setCursor(nextCursor);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <ComboBox
          aria-label="Search posts"
          inputValue={inputValue}
          onInputChange={setInputValue}
          allowsCustomValue
          menuTrigger="input"
          className="w-full max-w-md"
        >
          <ComboInput />
          <Popover>
            <ListBox items={items} selectionMode="single">
              {(item: PostRow) => (
                <ListBoxItem id={String(item.id)} textValue={item.title}>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-xs opacity-70">/{item.slug}</span>
                  </div>
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </ComboBox>
        <ComboBox
          aria-label="Filter category"
          selectedKey={selectedCat ?? undefined}
          onSelectionChange={(key) => setSelectedCat(key ? String(key) : null)}
          placeholder="Filter by category"
          className="w-full max-w-xs"
        >
          <ComboInput />
          <Popover>
            <ListBox items={cats} selectionMode="single">
              {(c: { id: number; name: string }) => (
                <ListBoxItem id={String(c.id)} textValue={c.name}>
                  {c.name}
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </ComboBox>
        <MButton
          className="btn btn-primary"
          whileTap={{ scale: 0.98 }}
          onPress={() => (window.location.href = "/admin/posts/new")}
        >
          New Post
        </MButton>
      </div>

      <div className="card bg-base-200 rounded-2xl p-2">
        <ListBox
          aria-label="Posts"
          selectionMode="single"
          items={filtered}
          onAction={(key) => (window.location.href = `/admin/posts/${key}`)}
          className="flex flex-col gap-1"
        >
          {(item: PostRow) => (
            <ListBoxItem
              id={String(item.id)}
              textValue={item.title}
              className="hover:bg-base-300 rounded-lg p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {item.title}
                  </div>
                  <div className="truncate text-xs opacity-70">
                    /{item.slug}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-70">
                  {item.publishedAt ? (
                    <span className="badge badge-success">Published</span>
                  ) : (
                    <span className="badge badge-ghost">Draft</span>
                  )}
                  <button
                    type="button"
                    aria-label="Delete"
                    className="btn btn-ghost btn-xs"
                    onClick={async (e) => {
                      e.preventDefault();
                      await fetch(`/api/admin/posts/${item.id}`, {
                        method: "DELETE",
                        cache: "no-store",
                      });
                      setItems((prev) => prev.filter((p) => p.id !== item.id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </ListBoxItem>
          )}
        </ListBox>
      </div>

      {cursor && (
        <div>
          <MButton
            className="btn"
            onPress={loadMore}
            isDisabled={busy}
            whileTap={{ scale: 0.98 }}
          >
            {busy ? "Loading…" : "Load more"}
          </MButton>
        </div>
      )}
    </div>
  );
}
