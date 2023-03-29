import { NextResponse } from "next/server"
import prisma from "../prisma"
import { Question } from "@prisma/client"

export async function POST(request: Request) {
  const body = await request.json()
  const question: Question = await prisma.question.findUnique({ where: { id: body.id } }).then(async (res: any) => await res)

  const votes1: number[] = question.votes1
  const votes2: number[] = question.votes2

  if ((votes1.includes(body.user.id)) || (votes2.includes(body.user.id))) return NextResponse.json({ status: 400, notification: { title: "But...", message: "You have already voted", color: "red" } })

  if (body.vote === 2) {
    await prisma.question.update({
      where: {
        id: body.id
      },
      data: {
        votes2: { push: body.user.id }
      }
    })
  } else if (body.vote === 1) {
    await prisma.question.update({
      where: {
        id: body.id
      },
      data: {
        votes1: { push: body.user.id }
      }
    })
  }

  return NextResponse.json({ status: 200, notification: { title: "Ok", message: `You have voted for ${(body.vote === 1 ? question.option1 : question.option2)}`, color: "green" } })
}
