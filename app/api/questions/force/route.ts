import { NextResponse } from "next/server"
import { ENoNo, SDeleteQuestion } from "../../messages"
import db from "@/db/db"
import { Question } from "@/db/schema/schema"
import { eq } from 'drizzle-orm/expressions'

export async function PATCH(request: Request) {
  const { questionid, role } = await request.json()

  if (!role || !questionid) return NextResponse.json(ENoNo)

  const deleted = await db.delete(Question)
    .where(eq(Question.id, Number(questionid)))

  return NextResponse.json(SDeleteQuestion)
}
