import { db } from "@/db/client";
import { categories, posts, services, works } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const tableMap = {
  post: posts,
  service: services,
  work: works,
  category: categories,
} as const;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";
  const type = searchParams.get("type") as keyof typeof tableMap;

  const table = tableMap[type];
  if (!table)
    return new NextResponse(
      JSON.stringify({ ok: false, error: "Unknown type" }),
      {
        status: 400,
        headers: { "cache-control": "no-store" },
      },
    );

  const rows = await db
    .select()
    .from(table)
    .where(eq((table as any).slug, slug));
  return new NextResponse(JSON.stringify({ available: rows.length === 0 }), {
    headers: { "cache-control": "no-store" },
  });
}
