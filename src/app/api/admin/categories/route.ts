import { db } from "@/db/client";
import { categories } from "@/db/schema";
import { CategoryInsert, CategorySelect } from "@/db/zod";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(categories);
  return NextResponse.json(rows, { headers: { "cache-control": "no-store" } });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "cache-control": "no-store" },
    });
  const data = CategoryInsert.parse(await req.json());
  const [row] = await db.insert(categories).values(data).returning();
  return NextResponse.json(CategorySelect.parse(row), {
    headers: { "cache-control": "no-store" },
  });
}
