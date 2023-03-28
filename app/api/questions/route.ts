import { NextResponse } from "next/server"
import { PrismaClient, Profile } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(request: Request) {
  const questions = await prisma.question.findMany()

  return NextResponse.json(questions)

}
