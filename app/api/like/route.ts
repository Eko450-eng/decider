import { NextResponse } from "next/server"
import prisma from "../prisma"
import { Question } from "@prisma/client"

export async function POST(request: Request) {
  const body = await request.json()

  const question: Question | null = await prisma.question.findUnique({ where: { id: body.id } })
  if (!question) return
  const likes: number[] = question.likes

  if (likes.includes(body.user.id)) return NextResponse.json({ status: 500, notification: { title: "Wow...", message: "You seem to double like this dont you", color: "red" } })

  await prisma.question.update({
    where: {
      id: body.id
    },
    data: {
      likes: {
        push: body.user.id,
      }
    }
  })

  return NextResponse.json({ status: 200, notification: { title: "Ok", message: `You liked this question`, color: "green" } })
}
