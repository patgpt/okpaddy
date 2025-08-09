"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

type MdxProps = {
  code: string;
};

export default function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <Component />
    </div>
  );
}
