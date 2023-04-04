import db from "@/db/db";
import { Pushdevices } from "@/db/schema/schema";
import { eq } from "drizzle-orm/expressions";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ status: 400, notification: { title: "Who are you?", message: "No username found", color: "red" } })

  const devices = await db.select().from(Pushdevices).where(eq(Pushdevices.profileId, id))

  return NextResponse.json(devices)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { device, userId } = body

  await db.insert(Pushdevices)
    .values({
      device: device,
      profileId: userId
    })

  return NextResponse.json({ message: "hi" })
}
