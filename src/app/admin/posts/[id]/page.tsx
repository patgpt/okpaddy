import { db } from "@/db/client";
import { postCategories, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import PostForm from "../PostForm";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const [p] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!p) return null;
  const cats = await db
    .select({ categoryId: postCategories.categoryId })
    .from(postCategories)
    .where(eq(postCategories.postId, id));
  const initial = {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    contentRich: p.contentRich,
    coverId: p.coverId,
    tags: (p.tags ?? []) as string[],
    categoryIds: cats.map((c) => Number(c.categoryId)),
    publishedAt: p.publishedAt ? String(p.publishedAt) : null,
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Edit Post</h1>
      {/* @ts-expect-error Server/Client boundary */}
      <PostForm initial={initial} />
    </div>
  );
}
