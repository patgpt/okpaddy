import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";
import { lowlight } from "lowlight";

export function renderRichToHtml(doc: unknown) {
  const html = generateHTML(doc ?? { type: "doc", content: [] }, [
    StarterKit.configure({ codeBlock: false }),
    CodeBlockLowlight.configure({ lowlight }),
    Underline,
    Link.configure({ protocols: ["http", "https", "mailto", "tel"] }),
    Image,
  ]);
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ["target", "rel"],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|\/)/i,
  });
}
