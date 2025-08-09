"use client";

import Link from "next/link";

// Placeholder registry for marketing MDX blocks
// TODO: implement real components
export const mdxComponents = {
  Lead: ({ children }: { children: React.ReactNode }) => (
    <p className="text-xl opacity-90">{children}</p>
  ),
  Section: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title?: string;
  }) => (
    <section className="mt-10">
      {title ? <h2 className="mb-3 text-2xl font-semibold">{title}</h2> : null}
      <div>{children}</div>
    </section>
  ),
  Card: ({
    children,
    title,
    subtitle,
  }: {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
  }) => (
    <div className="card bg-base-200">
      <div className="card-body">
        {title ? <h3 className="card-title">{title}</h3> : null}
        {subtitle ? <p className="opacity-70">{subtitle}</p> : null}
        {children}
      </div>
    </div>
  ),
  Checklist: ({ items = [] }: { items?: string[] }) => (
    <ul className="list-disc pl-6">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  ),
  FAQ: ({ src }: { src?: string }) => (
    <div className="mt-8 text-sm opacity-70">FAQ include {src}</div>
  ),
  CTA: ({
    href = "/contact",
    children,
  }: {
    href?: string;
    children?: React.ReactNode;
  }) => (
    <Link href={href} className="btn btn-primary mt-6 inline-flex">
      {children ?? "Book a consult"}
    </Link>
  ),
};
