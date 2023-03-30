import { NextResponse } from "next/server"
import prisma from "../prisma"
import { ENoLogon, ENoOption1, ENoOption2, ENoTitle, SCreateQuestion } from "../messages"

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.title) return NextResponse.json(ENoTitle)
  if (!body.option1) return NextResponse.json(ENoOption1)
  if (!body.option2) return NextResponse.json(ENoOption2)

  const user = await prisma.profile.findUnique({ where: { id: body.user.id } })

  if (!user) return NextResponse.json(ENoLogon)

  await prisma.question.create({
    data: {
      title: body.title,
      desc: body.desc,
      option1: body.option1,
      option2: body.option2,
      votes1: [],
      votes2: [],
      likes: [],
      poster: {
        connect: {
          id: body.user.id
        }
      }
    }
  })

  return NextResponse.json(SCreateQuestion)
}
