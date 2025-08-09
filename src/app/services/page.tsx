import { allServices } from "contentlayer/generated";
import Link from "next/link";

export const dynamic = "force-static";

export default function ServicesIndexPage() {
  const services = [...allServices]
    .filter((s) => s.published !== false)
    .sort(
      (a, b) =>
        (a.priority ?? 1e9) - (b.priority ?? 1e9) ||
        a.title.localeCompare(b.title),
    );

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">Services</h1>
      <ul className="grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s._id} className="card bg-base-200">
            <div className="card-body">
              <Link href={s.url} className="card-title hover:underline">
                {s.title}
              </Link>
              <p className="opacity-80">{s.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
