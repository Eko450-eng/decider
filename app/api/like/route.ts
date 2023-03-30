import { NextResponse } from "next/server"
import prisma from "../prisma"
import { Pushdevices, Question } from "@prisma/client"
import { sendPush } from "@/app/PushNotification/messaging"
import { ELiked, SLike } from "../messages"

export async function POST(request: Request) {
  const body = await request.json()

  const question: Question | null = await prisma.question.findUnique({ where: { id: body.id } })
  if (!question) return
  const likes: number[] = question.likes

  if (likes.includes(body.user.id)) return NextResponse.json(ELiked)

  await prisma.question.update({
    where: {
      id: body.id
    },
    data: {
      likes: {
        push: body.user.id,
      }
    }
  }).then(async (res: any) => {
    const resolved: Question = await res
    await prisma.pushdevices.findMany({
      where: {
        profileId: resolved.posterId
      }
    }).then(async (res: any) => {
      const question: Question | null = await prisma.question.findUnique({ where: { id: body.id } })
      res.forEach((device: Pushdevices) => {
        if (!question) return
        sendPush("Hey, listen!", `You got a new like on ${question.title}`, device.device)
      })
    })
  })
  return NextResponse.json(SLike)
}
