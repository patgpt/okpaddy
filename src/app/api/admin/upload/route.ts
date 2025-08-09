import { db } from "@/db/client";
import { media } from "@/db/schema";
import { MediaSelect } from "@/db/zod";
import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "cache-control": "no-store" },
    });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const alt = String(form.get("alt") ?? "");
  if (!file)
    return NextResponse.json(
      { error: "No file" },
      { status: 400, headers: { "cache-control": "no-store" } },
    );

  if (
    ![
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/avif",
      "image/gif",
    ].includes(file.type) ||
    file.size > 8 * 1024 * 1024
  ) {
    return NextResponse.json(
      { error: "Invalid image" },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  const blob = await put(
    `media/${Date.now()}-${file.name}`.replace(/\s+/g, "-"),
    file,
    {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true,
    },
  );

  const [row] = await db
    .insert(media)
    .values({ url: blob.url, alt })
    .returning();
  return NextResponse.json(MediaSelect.parse(row), {
    headers: { "cache-control": "no-store" },
  });
}
