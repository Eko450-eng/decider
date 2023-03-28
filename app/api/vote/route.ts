import { NextResponse } from "next/server"
import prisma from "../prisma"

export async function POST(request: Request) {
  const body = await request.json()

  const votes1: number[] = await prisma.question.findUnique({ where: { id: body.id } }).then(async (res: any) => await res.votes1)
  const votes2: number[] = await prisma.question.findUnique({ where: { id: body.id } }).then(async (res: any) => await res.votes2)

  if ((votes1.includes(body.user.id)) || (votes2.includes(body.user.id))) return NextResponse.json({ status: 400, title: "But...", message: "You have already voted", color: "red" })

  if (body.vote === 2) {
    await prisma.question.update({
      where: {
        id: body.id
      },
      data: {
        votes2: body.user.id
      }
    })
  } else if (body.vote === 1) {
    await prisma.question.update({
      where: {
        id: body.id
      },
      data: {
        votes1: body.user.id
      }
    })
  }

  return NextResponse.json({ status: 200, title: "Ok", message: `You have voted for ${body.vote}`, color: "green" })
}
