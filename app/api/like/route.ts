import { NextResponse } from "next/server"
import prisma from "../prisma"
import { Pushdevices, Question } from "@prisma/client"
import { sendPush } from "@/app/PushNotification/messaging"

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

  // await fetch(`/api/pushDevices?username=${body.user.username}`, {
  //   method: "GET"
  // })
  //   .then(async (e: any) => {
  //   })

  return NextResponse.json({ status: 200, notification: { title: "Ok", message: `You liked this question`, color: "green" } })
}
