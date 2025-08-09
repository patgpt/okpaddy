"use client";

import { MButton } from "@/ui/motion-rac";
import * as React from "react";
import {
  Input,
  Label,
  ListBox,
  ListBoxItem,
  TextField,
} from "react-aria-components";

type Cat = { id: number; name: string; slug: string };

async function loadCats(): Promise<Cat[]> {
  const res = await fetch("/api/admin/categories", { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as Cat[];
}

export default function CategoriesManager() {
  const [cats, setCats] = React.useState<Cat[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");

  React.useEffect(() => {
    loadCats().then(setCats);
  }, []);

  async function addCat() {
    if (!name || !slug) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, slug }),
        cache: "no-store",
      });
      if (!res.ok) return;
      const row = (await res.json()) as Cat;
      setCats((prev) => [...prev, row]);
      setName("");
      setSlug("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card bg-base-200 p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <TextField>
            <Label className="label">Name</Label>
            <Input
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName((e.target as HTMLInputElement).value)}
            />
          </TextField>
          <TextField>
            <Label className="label">Slug</Label>
            <Input
              className="input input-bordered w-full"
              value={slug}
              onChange={(e) => setSlug((e.target as HTMLInputElement).value)}
            />
          </TextField>
          <div className="flex items-end">
            <MButton
              className="btn btn-primary"
              onPress={addCat}
              isDisabled={busy}
              whileTap={{ scale: 0.98 }}
            >
              Add
            </MButton>
          </div>
        </div>
      </div>
      <div className="card bg-base-200 p-2">
        <ListBox
          aria-label="Categories"
          selectionMode="single"
          items={cats}
          className="flex flex-col gap-1"
        >
          {(c: Cat) => (
            <ListBoxItem
              id={String(c.id)}
              textValue={c.name}
              className="hover:bg-base-300 rounded-lg p-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs opacity-70">/{c.slug}</div>
                </div>
              </div>
            </ListBoxItem>
          )}
        </ListBox>
      </div>
    </div>
  );
}
