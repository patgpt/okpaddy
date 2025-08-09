"use client";

import * as React from "react";

export default function AdminTopbar({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="border-base-300 bg-base-100/80 sticky top-0 z-10 mb-4 flex items-center justify-between border-b px-1 py-3 backdrop-blur">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
