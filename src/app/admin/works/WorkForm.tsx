"use client";

import RichEditor from "@/app/admin/editor/RichEditor";
import { MediaPicker } from "@/app/admin/media/MediaPicker";
import { WorkInsert, WorkSelect, type TWork } from "@/db/zod";
import { MButton, MForm, MInput, MTextField } from "@/ui/motion-rac";
import { useState } from "react";
import { Input, Label, TextField } from "react-aria-components";

export default function WorkForm() {
  const [logoId, setLogoId] = useState<number | undefined>();
  const [contentRich, setContentRich] = useState<unknown>();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd);
    const wantsPublish = (raw as any).published === "on";

    const input = WorkInsert.parse({
      ...(raw as any),
      logoId,
      publishedAt: wantsPublish ? new Date().toISOString() : null,
      bullets: (raw as any).bullets
        ? String((raw as any).bullets)
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      tech: (raw as any).tech
        ? String((raw as any).tech)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      contentRich,
    });

    setBusy(true);
    const res = await fetch("/api/admin/works", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
      cache: "no-store",
    });
    setBusy(false);
    if (!res.ok) return alert("Save failed");
    const work: TWork = WorkSelect.parse(await res.json());
    console.log("Saved", work.id);
  }

  return (
    <MForm
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-200 gap-4 p-4"
    >
      <MTextField name="company">
        <Label className="label">Company</Label>
        <MInput className="input input-bordered w-full" />
      </MTextField>
      <MTextField name="role">
        <Label className="label">Role</Label>
        <MInput className="input input-bordered w-full" />
      </MTextField>
      <div className="grid grid-cols-2 gap-3">
        <MTextField name="startDate">
          <Label className="label">Start (YYYY-MM)</Label>
          <MInput className="input input-bordered w-full" />
        </MTextField>
        <MTextField name="endDate">
          <Label className="label">End (YYYY-MM or "present")</Label>
          <MInput className="input input-bordered w-full" />
        </MTextField>
      </div>

      <MTextField name="summary">
        <Label className="label">Summary</Label>
        <MInput className="input input-bordered w-full" />
      </MTextField>

      <div>
        <div className="label">Detailed body</div>
        <RichEditor value={contentRich} onChange={setContentRich} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TextField name="bullets">
          <Label className="label">Bullets (one per line)</Label>
          <Input className="input input-bordered w-full" />
        </TextField>
        <TextField name="tech">
          <Label className="label">Tech (comma separated)</Label>
          <Input className="input input-bordered w-full" />
        </TextField>
      </div>

      <label className="label cursor-pointer">
        <span className="label-text">Published</span>
        <input type="checkbox" name="published" className="toggle" />
      </label>

      <div>
        <div className="label">Logo</div>
        <MediaPicker onUploaded={(files) => setLogoId(files[0]?.id)} />
      </div>

      <MButton
        type="submit"
        className="btn btn-primary"
        isDisabled={busy}
        whileTap={{ scale: 0.98 }}
      >
        {busy ? "Saving…" : "Save work"}
      </MButton>
    </MForm>
  );
}
