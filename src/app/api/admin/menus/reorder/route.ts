import { db } from "@/db/client";
import { navItems } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "cache-control": "no-store" },
    });

  const Payload = z.object({
    items: z.array(
      z.object({ id: z.number().int(), order: z.number().int().nonnegative() }),
    ),
  });
  const { items } = Payload.parse(await req.json());

  await db.transaction(async (tx) => {
    for (const i of items) {
      await tx
        .update(navItems)
        .set({ order: i.order })
        .where(eq(navItems.id, i.id));
    }
  });

  return NextResponse.json(
    { ok: true },
    { headers: { "cache-control": "no-store" } },
  );
}
