import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70dvh] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-base-content/90 text-8xl font-bold">404</h1>
        <p className="mt-4 text-lg opacity-80">Page not found</p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/blog" className="btn btn-ghost">
            Visit blog
          </Link>
        </div>
      </div>
    </section>
  );
}
