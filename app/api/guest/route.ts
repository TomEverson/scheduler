import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { meeting } from "@/db/schema";
import { eq } from "drizzle-orm";

type Payload = {
    id: number,
    booked: true,
}

export const POST = async (req: NextRequest) => {
    const body = await req.json() as Payload
    await db.update(meeting).set({ id: body.id, booked: body.booked }).where(eq(meeting.id, body.id))
    return NextResponse.json({ msg: "OK" }, { status: 200 })
}