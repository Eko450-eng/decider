import db from "@/db/db";
import { Question } from "@/db/schema/schema";
import { NextResponse } from "next/server";


export async function GET() {
  const devices = await db.select().from(Question)
  return NextResponse.json(devices)
}

