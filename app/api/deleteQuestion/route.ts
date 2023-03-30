import { NextResponse } from "next/server"
import prisma from "../prisma"

export async function POST(request: Request) {
  const body = await request.json()

  const user = await prisma.profile.findUnique({ where: { id: body.user.id } })

  if (!user) return NextResponse.json({ status: 400, notification: { title: "Whoops", message: "Are you sure you are allowed to do that?", color: "red" } })

  const question = await prisma.question.findUnique({
    where: {
      id: body.question.id
    }
  })
  if (question && question.posterId === body.user.id) {
    await prisma.question.delete({
      where: {
        id: question.id
      }
    })
  } else return NextResponse.json({ status: 400, notification: { title: "Whoops", message: "Are you sure you are allowed to do that?", color: "red" } })

  return NextResponse.json({ status: 200, notification: { title: "Good question!", message: `Askening has been done`, color: "green" } })
}
