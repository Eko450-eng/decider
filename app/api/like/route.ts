import { NextResponse } from "next/server"
import prisma from "../prisma"

export async function POST(request: Request) {
  const body = await request.json()

  const likes: number[] = await prisma.question.findUnique({ where: { id: body.id } }).then(async (res: any) => await res.likes)

  if (likes.includes(body.user.id)) return NextResponse.json({ status: 200, title: "Wow...", message: "You seem to double like this dont you", color: "red" })

  await prisma.question.update({
    where: {
      id: body.id
    },
    data: {
      likes: body.user.id
    }
  })

  return NextResponse.json({ status: 200 })
}
