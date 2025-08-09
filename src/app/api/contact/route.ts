import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json().catch(() => ({}));
    return NextResponse.json({ ok: true, received: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
