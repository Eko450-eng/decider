import { NextResponse } from "next/server"
import prisma from "../prisma"
import { Question } from "@prisma/client"

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.title) return NextResponse.json({ status: 400, title: "Whoops", message: "Please enter a title", color: "red" })
  if (!body.option1) return NextResponse.json({ status: 400, title: "Whoops", message: "Please enter option one", color: "red" })
  if (!body.option2) return NextResponse.json({ status: 400, title: "Whoops", message: "Please enter option two", color: "red" })

  const user = await prisma.profile.findUnique({ where: { id: body.user.id } })

  if (!user) return NextResponse.json({ status: 400, title: "Whoops", message: "Are you sure you are logged in?", color: "red" })

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

  return NextResponse.json({ status: 200, title: "Good question!", message: `Askening has been done`, color: "green" })
}
