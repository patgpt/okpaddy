import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export const dynamic = "force-static";

export default function BlogIndexPage() {
  const posts = [...allPosts]
    .filter((p) => p.published !== false)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post._id} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-2xl font-medium group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-2 opacity-70">{post.summary}</p>
              <time className="mt-1 block text-sm opacity-60">
                {new Date(post.date).toLocaleDateString()}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
