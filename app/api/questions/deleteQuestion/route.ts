import { NextResponse } from "next/server"
import { ENoPerm, SDeleteQuestion } from "../../messages"
import db from "@/db/db"
import { Question } from "@/db/schema/schema"
import { and, eq } from 'drizzle-orm/expressions'

export async function POST(request: Request) {
  const body = await request.json()
  const { userId, questionId } = body

  const deleted = await db.delete(Question).where(and(eq(Question.posterId, userId), eq(Question.id, questionId)))
  if (!deleted) return NextResponse.json(ENoPerm)

  return NextResponse.json(SDeleteQuestion)
}
