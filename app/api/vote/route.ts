import { NextResponse } from "next/server"
import prisma from "../prisma"
import { Pushdevices, Question } from "@prisma/client"
import { sendPush } from "@/app/PushNotification/messaging"
import { EAlreadyVoted } from "../messages"

export async function POST(request: Request) {
  const body = await request.json()
  const question: Question = await prisma.question.findUnique({ where: { id: body.id } }).then(async (res: any) => await res)

  const votes1: number[] = question.votes1
  const votes2: number[] = question.votes2

  if ((votes1.includes(body.user.id)) || (votes2.includes(body.user.id))) return NextResponse.json(EAlreadyVoted)

  if (body.vote === 2) {
    await prisma.question.update({
      where: {
        id: body.id
      },
      data: {
        votes2: { push: body.user.id }
      }
    })
      .then(async (res: any) => {
        const resolved: Question = await res
        await prisma.pushdevices.findMany({
          where: {
            profileId: resolved.posterId
          }
        }).then(async (res: any) => {
          const question: Question | null = await prisma.question.findUnique({ where: { id: body.id } })
          res.forEach((device: Pushdevices) => {
            if (!question) return
            sendPush("Hey, listen!", `You got a new vote on ${question.title}`, device.device)
          })
        })
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
      .then(async (res: any) => {
        const resolved: Question = await res
        await prisma.pushdevices.findMany({
          where: {
            profileId: resolved.posterId
          }
        }).then(async (res: any) => {
          const question: Question | null = await prisma.question.findUnique({ where: { id: body.id } })
          res.forEach((device: Pushdevices) => {
            if (!question) return
            sendPush("Hey, listen!", `You got a new vote on ${question.title}`, device.device)
          })
        })
      })
  }

  return NextResponse.json({ status: 200, notification: { title: "Ok", message: `You have voted for ${(body.vote === 1 ? question.option1 : question.option2)}`, color: "green" } })
}
