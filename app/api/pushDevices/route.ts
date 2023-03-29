import { NextResponse } from "next/server";
import prisma from "../prisma";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")
  if (!username) return NextResponse.json({ status: 400, notification: { title: "Who are you?", message: "No username found", color: "red" } })

  const user = await prisma.profile.findUnique({
    where: {
      username: username
    }
  })

  if (!user) return
  const devices = await prisma.pushdevices.findMany({
    where: {
      profileId: user.id
    }
  })
  console.log(devices)
  return NextResponse.json(devices)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await prisma.profile.findUnique({
    where: {
      username: body.username
    }
  })

  if (!user) return
  await prisma.pushdevices.create({
    data: {
      device: body.device,
      profile: {
        connect: {
          username: user.username
        }
      }
    }
  })
  return NextResponse.json({ message: "hi" })
}
