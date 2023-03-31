import { NextResponse } from "next/server"
import prisma from "../prisma"
import { ENoPerm, SDeleteQuestion } from "../messages"

export async function POST(request: Request) {
  const body = await request.json()

  const user = await prisma.profile.findUnique({ where: { id: body.user.id } })

  if (!user) return NextResponse.json(ENoPerm)

  const question = await prisma.question.findUnique({
    where: {
      id: body.question.id
    }
  })

  if ((question && question.posterId === body.user.id) || (question && body.user.role >= 5)) {
    await prisma.question.delete({
      where: {
        id: question.id
      }
    })
  } else return NextResponse.json(ENoPerm)

  await fetch(`/api/revalidate?token=${process.env.NEXT_PUBLIC_SECRETKEY}`)
  return NextResponse.json(SDeleteQuestion)
}
