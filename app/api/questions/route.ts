import { NextResponse } from "next/server"
import prisma from "../prisma"

export async function GET() {
  const questions = await prisma.question.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return NextResponse.json(questions)
}
