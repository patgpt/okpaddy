import { db } from "@/db/client";
import { works } from "@/db/schema";
import { WorkInsert, WorkSelect } from "@/db/zod";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "cache-control": "no-store" },
    });

  const data = WorkInsert.parse(await req.json());
  const [row] = await db
    .insert(works)
    .values({ ...data, createdAt: new Date() })
    .returning();
  return new NextResponse(JSON.stringify(WorkSelect.parse(row)), {
    headers: { "cache-control": "no-store" },
  });
}
