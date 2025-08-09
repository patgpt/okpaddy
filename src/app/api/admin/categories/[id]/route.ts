import { db } from "@/db/client";
import { categories } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  const { userId } = await auth();
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "cache-control": "no-store" },
    });
  const id = Number(params.id);
  await db.delete(categories).where(eq(categories.id, id));
  return NextResponse.json(
    { ok: true },
    { headers: { "cache-control": "no-store" } },
  );
}
