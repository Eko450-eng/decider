import { NextResponse } from "next/server"
import { ENoLogon, ENoOption1, ENoOption2, ENoTitle, SCreateQuestion, SLike, SLiked } from "../messages"
import { Question } from "@/db/schema/schema"
import db from "@/db/db"
import { and, placeholder, eq } from "drizzle-orm"
import { ENoNo, ENoPerm, SDeleteQuestion } from "../messages"
import { liking, voting } from "./logic"

const prepareCreateQuestion = db.insert(Question).values({
  title: placeholder('title'),
  desc: placeholder('desc'),
  option1: placeholder('option1'),
  option2: placeholder('option2'),
  image1: placeholder('image1'),
  image2: placeholder('image2'),
  votes1: [],
  votes2: [],
  likes: [],
  posterId: placeholder('posterId')
}).prepare("createQuestion")

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.title) return NextResponse.json(ENoTitle)
  if (!body.option1) return NextResponse.json(ENoOption1)
  if (!body.option2) return NextResponse.json(ENoOption2)
  if (!body.userId) return NextResponse.json(ENoLogon)

  await prepareCreateQuestion.execute({
    title: body.title,
    desc: body.desc,
    option1: body.option1,
    option2: body.option2,
    image1: body.image1,
    image2: body.image2,
    posterId: body.userId
  })

  return NextResponse.json(SCreateQuestion)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userid")
  const questionId = searchParams.get("questionid")

  if (!userId || !questionId) return NextResponse.json(ENoNo)

  const deleted = await db.delete(Question)
    .where(and(eq(Question.posterId, userId), eq(Question.id, Number(questionId))))

  if (!deleted) return NextResponse.json(ENoPerm)

  return NextResponse.json(SDeleteQuestion)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { questionId, userId, vote, type } = body
  switch (type) {
    case "like":
      return liking(userId, Number(questionId))
    case "vote":
      return voting(userId, Number(questionId), vote)
    default:
      return NextResponse.json(ENoNo)
  }
}
