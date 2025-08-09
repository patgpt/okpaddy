import { db } from "@/db/client";
import { media } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth();
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "cache-control": "no-store" },
    });

  const { id: idStr } = await context.params;
  const id = Number(idStr);
  const [row] = await db.delete(media).where(eq(media.id, id)).returning();
  if (!row)
    return NextResponse.json(
      { ok: false },
      { status: 404, headers: { "cache-control": "no-store" } },
    );

  try {
    await del(row.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
  } catch {}
  return NextResponse.json(
    { ok: true },
    { headers: { "cache-control": "no-store" } },
  );
}
