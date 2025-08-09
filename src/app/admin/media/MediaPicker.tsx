"use client";

import { MediaSelect, type TMedia } from "@/db/zod";
import { MButton, MDropZone, MFileTrigger } from "@/ui/motion-rac";
import { useState } from "react";
import { Input, TextField } from "react-aria-components";

export function MediaPicker({
  onUploaded,
}: {
  onUploaded: (files: TMedia[]) => void;
}) {
  const [alt, setAlt] = useState("");
  const [busy, setBusy] = useState(false);

  async function upload(files: FileList | File[]) {
    const list = Array.from(files || []).slice(0, 5);
    if (!list.length) return;
    setBusy(true);
    try {
      const out: TMedia[] = [];
      for (const f of list) {
        const fd = new FormData();
        fd.set("file", f);
        fd.set("alt", alt);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: fd,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Upload failed");
        out.push(MediaSelect.parse(await res.json()));
      }
      onUploaded(out);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <TextField>
        <label className="label">Alt text</label>
        <Input
          className="input input-bordered w-full"
          value={alt}
          onChange={(e) => setAlt((e.target as HTMLInputElement).value)}
        />
      </TextField>

      <MDropZone
        onDrop={(e) =>
          upload(
            e.items
              .filter((i) => i.kind === "file")
              .map((i) => i.getFile() as File),
          )
        }
        className="bg-base-200/50 hover:bg-base-200 rounded-xl border border-dashed p-6 text-center transition"
      >
        <div>Drag image here</div>
        <MFileTrigger
          acceptedFileTypes={["image/*"]}
          allowsMultiple
          onSelect={upload}
        >
          <MButton className="btn btn-primary mt-2" isDisabled={busy}>
            {busy ? "Uploading…" : "Choose files"}
          </MButton>
        </MFileTrigger>
      </MDropZone>
    </div>
  );
}
