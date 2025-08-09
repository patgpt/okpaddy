import { db } from "@/db/client";
import { posts } from "@/db/schema";
import { PostInsert, PostSelect } from "@/db/zod";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "cache-control": "no-store" },
    });

  const data = PostInsert.parse(await req.json());
  const [row] = await db
    .insert(posts)
    .values({ ...data, createdAt: new Date(), updatedAt: new Date() })
    .returning();
  return new NextResponse(JSON.stringify(PostSelect.parse(row)), {
    headers: { "cache-control": "no-store" },
  });
}
