import { NextResponse } from "next/server"
import { sendPush } from "@/app/PushNotification/messaging"
import { EAlreadyVoted } from "../../messages"
import db from "@/db/db"
import { Pushdevices, Question } from "@/db/schema/schema"
import { eq } from "drizzle-orm/expressions"

export async function POST(request: Request) {
  const body = await request.json()
  const { questionId, userId, vote } = body

  const questions = await db.select().from(Question).where(eq(Question.id, questionId))
  const question = questions[0]
  const posterPushdevices = await db.select().from(Pushdevices).where(eq(Pushdevices.profileId, question.posterId))

  const votes1: string[] = question.votes1
  const votes2: string[] = question.votes2

  if ((votes1.includes(userId)) || (votes2.includes(userId))) return NextResponse.json(EAlreadyVoted)

  if (vote === 2) {
    await db.update(Question)
      .set({ votes2: [...question.votes2, `${userId}`] })
      .where(eq(Question.id, questionId))

    posterPushdevices.forEach((device) => {
      if (!device || !device.device) return
      sendPush("Hey, listen!", `You got a new vote on ${question.title}`, device.device)
    })
  }

  else if (vote === 1) {
    await db.update(Question)
      .set({ votes1: [...question.votes1, `${userId}`] })
      .where(eq(Question.id, questionId))

    posterPushdevices.forEach((device) => {
      if (!device || !device.device) return
      sendPush("Hey, listen!", `You got a new vote on ${question.title}`, device.device)
    })
  }

  await fetch(`/api/revalidate?token=${process.env.NEXT_PUBLIC_SECRETKEY}`)
  return NextResponse.json({ status: 200, notification: { title: "Ok", message: `You have voted for ${(vote === 1 ? question.option1 : question.option2)}`, color: "green" } })
}
