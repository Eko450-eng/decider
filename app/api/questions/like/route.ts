import { NextResponse } from "next/server"
import { sendPush } from "@/app/PushNotification/messaging"
import { SLike, SLiked } from "../../messages"
import db from "@/db/db"
import { Pushdevices, Question } from "@/db/schema/schema"
import { eq } from "drizzle-orm/expressions"

export async function POST(request: Request) {
  const body = await request.json()
  const { questionId, userId } = body

  const initialRaw = await db.select().from(Question).where(eq(Question.id, questionId))
  const initial = initialRaw[0]
  const posterPushdevices = await db.select().from(Pushdevices).where(eq(Pushdevices.profileId, initial.posterId))

  if (initial.likes.includes(userId)) {
    const newLikeArray = initial.likes.filter(users => {
      return users !== userId
    })

    await db.update(Question)
      .set({ likes: newLikeArray })
      .where(eq(Question.id, questionId))

    return NextResponse.json(SLiked)
  }

  if (!initial.likes.includes(userId)) {
    await db.update(Question)
      .set({ likes: [...initial.likes, `${userId}`] })
      .where(eq(Question.id, questionId))

    posterPushdevices.forEach((device) => {
      if (!device || !device.device) return
      sendPush("Hey, listen!", `You got a new like on ${initial.title}`, device.device)
    })

    return NextResponse.json(SLike)
  }
}
