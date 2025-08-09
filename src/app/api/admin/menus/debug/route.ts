import { db } from "@/db/client";
import { navItems } from "@/db/schema";
import { count } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [row] = await db.select({ c: count() }).from(navItems);
    return NextResponse.json({ ok: true, count: Number(row.c) });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
