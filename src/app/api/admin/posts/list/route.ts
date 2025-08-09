import { db } from "@/db/client";
import { postCategories, posts } from "@/db/schema";
import { desc, eq, lt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 20), 100);
  const cursor = Number(searchParams.get("cursor") || 0) || null;

  let base = db
    .select()
    .from(posts)
    .orderBy(desc(posts.id))
    .limit(limit + 1);
  const cat = Number(searchParams.get("categoryId") || 0) || null;
  if (cat) {
    base = db
      .select()
      .from(posts)
      .innerJoin(postCategories, eq(postCategories.postId, posts.id))
      .where(eq(postCategories.categoryId, cat))
      .orderBy(desc(posts.id))
      .limit(limit + 1) as any;
  }
  const rows = cursor ? await base.where(lt(posts.id, cursor)) : await base;

  const data = rows.slice(0, limit);
  const nextCursor =
    rows.length > limit ? (data[data.length - 1]?.id ?? null) : null;
  return new NextResponse(JSON.stringify({ data, nextCursor }), {
    headers: { "cache-control": "no-store" },
  });
}
