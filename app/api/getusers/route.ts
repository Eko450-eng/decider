import { PrismaClient, Profile } from '@prisma/client'
import bcrypt from 'bcryptjs-react'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json() as Profile
  const { username, password } = body


  const user = await prisma.profile.findMany({
    where: {
      username: username
    }
  }).then(async (e: any) => {
    const user = await e[0] as Profile
    const comparedPass = bcrypt.compareSync(password, user.password)
    if (!comparedPass) return NextResponse.json({ status: 400, title: "Woop", message: "Wrong password or username please try again", color: "red" })

    if (e.length < 1) return NextResponse.json({ message: "Something went wrong I don't know what" })

    const token = await jwt.sign(e[0], process.env.JWT_TOKEN!)


    return NextResponse.json({ status: 200, user: e[0], token: token, notifications: { title: "Welcome", message: "Welcome back", color: "green" } })
  })
  return user
}
