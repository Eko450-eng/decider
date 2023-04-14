import { NextResponse } from "next/server"
import { ENoLogon, ENoOption1, ENoOption2, ENoTitle, SCreateQuestion } from "../../messages"
import db from "@/db/db"
import { Question } from "@/db/schema/schema"

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.title) return NextResponse.json(ENoTitle)
  if (!body.option1) return NextResponse.json(ENoOption1)
  if (!body.option2) return NextResponse.json(ENoOption2)
  if (!body.userId) return NextResponse.json(ENoLogon)

  await db.insert(Question).values({
    title: body.title,
    desc: body.desc,
    option1: body.option1,
    option2: body.option2,
    image1: body.image1,
    image2: body.image2,
    votes1: [],
    votes2: [],
    likes: [],
    posterId: body.userId
  })

  return NextResponse.json(SCreateQuestion)
}
