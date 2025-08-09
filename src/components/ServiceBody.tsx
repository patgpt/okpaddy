"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

type Props = {
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, any>;
};

export default function ServiceBody({ code, components }: Props) {
  const MDX = useMDXComponent(code);
  return <MDX components={components} />;
}
