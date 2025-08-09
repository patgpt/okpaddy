"use client";

import RichEditor from "@/app/admin/editor/RichEditor";
import { MediaPicker } from "@/app/admin/media/MediaPicker";
import { PostInsert, PostSelect, type TPost } from "@/db/zod";
import { MButton, MForm, MInput, MTextField } from "@/ui/motion-rac";
import { useEffect, useState } from "react";
import {
  ComboBox,
  Input as ComboInput,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Text,
} from "react-aria-components";

type InitialPost = {
  id?: number;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  contentRich?: unknown;
  coverId?: number | null;
  tags?: string[] | null;
  categoryIds?: number[] | null;
  publishedAt?: string | null;
};

export default function PostForm({ initial }: { initial?: InitialPost }) {
  const [coverId, setCoverId] = useState<number | undefined>();
  const [contentRich, setContentRich] = useState<unknown>();
  const [busy, setBusy] = useState(false);
  const [slugValue, setSlugValue] = useState("");
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [cats, setCats] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedCatKeys, setSelectedCatKeys] = useState<Set<string>>(
    new Set(),
  );

  useSlugCheck(slugValue, setSlugChecking, setSlugAvailable);
  // Prefill when editing
  useEffect(() => {
    if (!initial) return;
    setSlugValue(initial.slug ?? "");
    setContentRich(initial.contentRich);
    setCoverId(initial.coverId ?? undefined);
    setTags((initial.tags ?? []) as string[]);
    if (initial.categoryIds?.length) {
      setSelectedCatKeys(new Set(initial.categoryIds.map((n) => String(n))));
    }
  }, [initial]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/categories", { cache: "no-store" });
        if (!res.ok) return;
        const rows = (await res.json()) as Array<{ id: number; name: string }>;
        setCats(rows);
      } catch {}
    })();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd);
    const wantsPublish = (raw as any).published === "on";

    const input = PostInsert.parse({
      ...(raw as any),
      coverId,
      publishedAt: wantsPublish ? new Date().toISOString() : null,
      tags,
      contentRich,
    });

    const categoryIds = Array.from(selectedCatKeys)
      .map((k) => Number(k))
      .filter((n) => Number.isFinite(n));
    setBusy(true);
    const isEdit = Boolean(initial?.id);
    const res = await fetch("/api/admin/posts/with-categories", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        isEdit
          ? { id: Number(initial!.id), post: input, categoryIds }
          : { post: input, categoryIds },
      ),
      cache: "no-store",
    });
    setBusy(false);
    if (!res.ok) return alert("Save failed");
    const post: TPost = PostSelect.parse(await res.json());
    console.log("Saved", post.id);
  }

  return (
    <MForm
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-200 gap-4 p-4"
    >
      <MTextField name="title">
        <Label className="label">Title</Label>
        <MInput
          className="input input-bordered w-full"
          whileFocus={{ scale: 1.01 }}
          defaultValue={initial?.title ?? ""}
        />
      </MTextField>
      <MTextField
        name="slug"
        validationState={slugAvailable === false ? "invalid" : undefined}
      >
        <Label className="label">Slug</Label>
        <MInput
          className="input input-bordered w-full"
          value={slugValue}
          onChange={(e) => setSlugValue((e.target as HTMLInputElement).value)}
        />
        {slugAvailable === false && (
          <Text slot="errorMessage" className="text-error text-xs">
            Slug is already in use
          </Text>
        )}
        {slugChecking && (
          <Text slot="description" className="text-xs opacity-70">
            Checking availability…
          </Text>
        )}
      </MTextField>
      <MTextField name="excerpt">
        <Label className="label">Excerpt</Label>
        <MInput
          className="input input-bordered w-full"
          defaultValue={initial?.excerpt ?? ""}
        />
      </MTextField>

      <div>
        <div className="label">Body</div>
        <RichEditor value={contentRich} onChange={setContentRich} />
      </div>

      <div>
        <div className="label">Categories</div>
        <div className="card bg-base-200 p-2">
          <ListBox
            aria-label="Categories"
            items={cats}
            selectionMode="multiple"
            selectedKeys={selectedCatKeys}
            onSelectionChange={(keys) =>
              setSelectedCatKeys(new Set(keys as Set<string>))
            }
            className="flex flex-col gap-1"
          >
            {(c: { id: number; name: string }) => (
              <ListBoxItem
                id={String(c.id)}
                textValue={c.name}
                className="hover:bg-base-300 rounded-lg p-2"
              >
                {c.name}
              </ListBoxItem>
            )}
          </ListBox>
        </div>
      </div>

      <label className="label cursor-pointer">
        <span className="label-text">Published</span>
        <input
          type="checkbox"
          name="published"
          className="toggle"
          defaultChecked={Boolean(initial?.publishedAt)}
        />
      </label>

      <div>
        <div className="label">Tags</div>
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="badge badge-ghost gap-2">
              {t}
              <button
                type="button"
                aria-label={`Remove ${t}`}
                className="btn btn-ghost btn-xs"
                onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="max-w-md">
          <ComboBox
            aria-label="Add tag"
            inputValue={tagInput}
            onInputChange={setTagInput}
            allowsCustomValue
            menuTrigger="input"
            onSelectionChange={(key) => {
              const v = String(key ?? "")
                .trim()
                .toLowerCase();
              if (v && !tags.includes(v)) setTags((prev) => [...prev, v]);
              setTagInput("");
            }}
          >
            <ComboInput />
            <Popover>
              <ListBox
                items={tagInput ? [{ id: tagInput, label: tagInput }] : []}
                selectionMode="single"
              >
                {(opt: { id: string; label: string }) => (
                  <ListBoxItem id={opt.id} textValue={opt.label}>
                    {opt.label}
                  </ListBoxItem>
                )}
              </ListBox>
            </Popover>
          </ComboBox>
        </div>
      </div>

      <div>
        <div className="label">Cover image</div>
        <MediaPicker onUploaded={(files) => setCoverId(files[0]?.id)} />
      </div>

      <MButton
        type="submit"
        className="btn btn-primary"
        isDisabled={busy}
        whileTap={{ scale: 0.98 }}
      >
        {busy ? "Saving…" : "Save post"}
      </MButton>
    </MForm>
  );
}

// Slug availability check
// Debounce 400ms on input changes and query /api/admin/slug/check
export function useSlugCheck(
  value: string,
  setChecking: (b: boolean) => void,
  setAvailable: (b: boolean | null) => void,
) {
  const slugRegex = /^[a-z0-9-]+$/;
  useEffect(() => {
    let active = true;
    if (!value || !slugRegex.test(value)) {
      setAvailable(null);
      return;
    }
    setChecking(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/admin/slug/check?type=post&slug=${encodeURIComponent(value)}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        if (active) setAvailable(Boolean(data.available));
      } finally {
        if (active) setChecking(false);
      }
    }, 400);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [value, setChecking, setAvailable]);
}
