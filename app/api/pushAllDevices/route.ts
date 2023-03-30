import { NextResponse } from "next/server";
import prisma from "../prisma";


export async function GET() {
  const devices = await prisma.pushdevices.findMany({})
  return NextResponse.json(devices)
}

