import db from "@/db/db"
import { Question } from "@/db/schema/schema"
import { placeholder } from "drizzle-orm"
import { eq } from "drizzle-orm/expressions"
import { NextResponse } from "next/server"

const questionsQuery = db.select()
  .from(Question)
  .where(eq(Question.id, placeholder("id")))
  .prepare("question")

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  const questions = await questionsQuery.execute({
    id: id
  })
  return NextResponse.json(questions[0])
}
