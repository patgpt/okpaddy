import { db } from "@/db/client";
import { postCategories, posts } from "@/db/schema";
import { PostInsert, PostSelect } from "@/db/zod";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({
  post: PostInsert,
  categoryIds: z.array(z.number().int()).default([]),
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "cache-control": "no-store" },
    });
  const { post, categoryIds } = Body.parse(await req.json());

  const result = await db.transaction(async (tx) => {
    const [p] = await tx
      .insert(posts)
      .values({ ...post, createdAt: new Date(), updatedAt: new Date() })
      .returning();
    if (categoryIds.length) {
      await tx
        .insert(postCategories)
        .values(categoryIds.map((id) => ({ postId: p.id, categoryId: id })));
    }
    return p;
  });

  return new NextResponse(JSON.stringify(PostSelect.parse(result)), {
    headers: { "cache-control": "no-store" },
  });
}

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "cache-control": "no-store" },
    });
  const { post, categoryIds, id } = Body.extend({ id: z.number().int() }).parse(
    await req.json(),
  );

  const result = await db.transaction(async (tx) => {
    const [p] = await tx
      .update(posts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    await tx.delete(postCategories).where(eq(postCategories.postId, id));
    if (categoryIds.length)
      await tx
        .insert(postCategories)
        .values(categoryIds.map((cid) => ({ postId: id, categoryId: cid })));
    return p;
  });

  return new NextResponse(JSON.stringify(PostSelect.parse(result)), {
    headers: { "cache-control": "no-store" },
  });
}
