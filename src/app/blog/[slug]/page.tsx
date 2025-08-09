import Mdx from "@/components/Mdx";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-4 text-4xl font-semibold tracking-tight">
        {post.title}
      </h1>
      <time className="mb-10 block text-sm opacity-60">
        {new Date(post.date).toLocaleDateString()}
      </time>
      <Mdx code={post.body.code} />
    </article>
  );
}
