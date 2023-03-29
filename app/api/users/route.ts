import { Profile } from '@prisma/client'
import { NextResponse } from 'next/server'
import prisma from "../prisma"

const prismaRejectionEmail = "Invalid `prisma.profile.create()` invocation:Unique constraint failed on the fields: (`email`)"
const prismaRejectionUsername = "Invalid `prisma.profile.create()` invocation:Unique constraint failed on the fields: (`username`)"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")
  if (!username) return NextResponse.json({ status: 400, notification: { title: "Who are you?", message: "No username found", color: "red" } })

  const user = await prisma.profile.findUnique({
    where: {
      username: username
    }
  })
  return NextResponse.json(user)
}

export async function POST(request: Request) {
  const body = await request.json() as Profile
  const { email, role, password, username } = body

  try {
    await prisma.profile.create({
      data: {
        email: email,
        role: role,
        password: password,
        username: username
      }
    })

    return NextResponse.json({ status: 200, notification: { title: "Welcome", message: "User created", color: "green" } })
  } catch (e: any) {
    if (e.message) {
      const errorMessage: string = e.message
      const errorClean = errorMessage.replaceAll(/\n/gm, "")

      if (errorClean == prismaRejectionEmail) return NextResponse.json({ status: 400, notification: { title: "Woops", message: "This email already exists", color: "red" } })
      if (errorClean == prismaRejectionUsername) return NextResponse.json({ status: 400, notification: { title: "Woops", message: "This username already exists", color: "red" } })
    }
    return NextResponse.json({ status: 400, notification: { title: "Woops", message: "Something went wrong", color: "red" } })
  }
}
