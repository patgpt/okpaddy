"use client";

import { MButton } from "@/ui/motion-rac";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import typescript from "highlight.js/lib/languages/typescript";
import { lowlight } from "lowlight";

lowlight.registerLanguage("javascript", javascript);
lowlight.registerLanguage("typescript", typescript);
lowlight.registerLanguage("json", json);
lowlight.registerLanguage("markdown", markdown);

type Props = {
  value?: unknown;
  onChange?: (json: unknown) => void;
  placeholder?: string;
};

export default function RichEditor({
  value,
  onChange,
  placeholder = "Write something legendary…",
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: true,
        protocols: ["http", "https", "mailto", "tel"],
        validate: (href) => /^https?:\/\/|^\/|^mailto:|^tel:/.test(href),
      }),
      Image.configure({ HTMLAttributes: { class: "max-w-full rounded" } }),
      Placeholder.configure({ placeholder }),
    ],
    content:
      value && typeof value === "object" ? value : { type: "doc", content: [] },
    onUpdate({ editor }) {
      onChange?.(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none dark:prose-invert focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  async function insertImage(file: File) {
    const fd = new FormData();
    fd.set("file", file);
    fd.set("alt", file.name);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
      cache: "no-store",
    });
    if (!res.ok) return;
    const media = await res.json();
    editor
      .chain()
      .focus()
      .setImage({ src: media.url, alt: media.alt ?? "" })
      .run();
  }

  return (
    <div className="border-base-300 bg-base-200 rounded-xl border">
      <div className="border-base-300 flex flex-wrap gap-2 border-b p-2">
        <MButton
          className={`btn btn-xs ${editor.isActive("bold") ? "btn-active" : ""}`}
          onPress={() => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          B
        </MButton>
        <MButton
          className={`btn btn-xs ${editor.isActive("italic") ? "btn-active" : ""}`}
          onPress={() => {
            editor.chain().focus().toggleItalic().run();
          }}
        >
          I
        </MButton>
        <MButton
          className={`btn btn-xs ${editor.isActive("underline") ? "btn-active" : ""}`}
          onPress={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
        >
          U
        </MButton>
        <MButton
          className={`btn btn-xs ${editor.isActive("bulletList") ? "btn-active" : ""}`}
          onPress={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          • List
        </MButton>
        <MButton
          className={`btn btn-xs ${editor.isActive("orderedList") ? "btn-active" : ""}`}
          onPress={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          1. List
        </MButton>
        <MButton
          className={`btn btn-xs ${editor.isActive("blockquote") ? "btn-active" : ""}`}
          onPress={() => {
            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          ❝
        </MButton>
        <MButton
          className="btn btn-xs"
          onPress={() => {
            editor.chain().focus().setHorizontalRule().run();
          }}
        >
          ─
        </MButton>
        <MButton
          className={`btn btn-xs ${editor.isActive("codeBlock") ? "btn-active" : ""}`}
          onPress={() => {
            editor.chain().focus().toggleCodeBlock().run();
          }}
        >{`{ }`}</MButton>

        <label className="btn btn-xs ml-auto">
          Insert image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.currentTarget.files && insertImage(e.currentTarget.files[0])
            }
          />
        </label>
      </div>
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
