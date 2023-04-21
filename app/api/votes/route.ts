import db from "@/db/db"
import { Question } from "@/db/schema/schema"
import { placeholder } from "drizzle-orm"
import { eq } from "drizzle-orm/expressions"
import { NextResponse } from "next/server"

const questionsQuery = db.select({
  votes1: Question.votes1,
  votes2: Question.votes2,
  option1: Question.option1,
  option2: Question.option2,
})
  .from(Question)
  .where(eq(Question.id, placeholder("id")))
  .prepare("questionVote")

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  const questions = await questionsQuery.execute({
    id: id
  })

  return NextResponse.json(questions[0])
}
