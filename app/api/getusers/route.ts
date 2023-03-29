import { Profile } from '@prisma/client'
import bcrypt from 'bcryptjs-react'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from "../prisma"

export async function POST(request: Request) {
  const body = await request.json() as Profile
  const { username, password } = body


  const user = await prisma.profile.findMany({
    where: {
      username: username
    }
  })
    .then(async (e: any) => {
      if (e.length <= 0) return NextResponse.json({ status: 400, notification: { title: "Woop", message: "Wrong username please try again", color: "red" } })
      const user = await e[0] as Profile
      const comparedPass = bcrypt.compareSync(password, user.password)
      if (!comparedPass) return NextResponse.json({ status: 400, notification: { title: "Woop", message: "Wrong password please try again", color: "red" } })

      if (e.length < 1) return NextResponse.json({ status: 500, notification: { message: "Something went wrong I don't know what" } })

      const token = jwt.sign(e[0], process.env.JWT_TOKEN!)

      return NextResponse.json({ status: 200, user: e[0], token: token, notification: { title: "Welcome", message: "Welcome back", color: "green" } })
    })
  return user
}
