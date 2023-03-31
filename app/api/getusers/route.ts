import { Profile } from '@prisma/client'
import bcrypt from 'bcryptjs-react'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from "../prisma"
import { ENoNo, EWrongPassword, EWrongUsername } from '../messages'

export async function POST(request: Request) {
  const body = await request.json() as Profile
  const { username, password } = body


  const user = await prisma.profile.findMany({
    where: {
      username: username
    }
  })
    .then(async (e: any) => {
      if (e.length <= 0) return NextResponse.json(EWrongUsername)
      const user = await e[0] as Profile
      const comparedPass = bcrypt.compareSync(password, user.password)
      if (!comparedPass) return NextResponse.json(EWrongPassword)

      if (e.length < 1) return NextResponse.json(ENoNo)

      const token = jwt.sign(e[0], process.env.JWT_TOKEN!)

      return NextResponse.json({ status: 200, user: e[0], token: token, notification: { title: "Welcome", message: "Hope you enjoy your stay", color: "green" } })
    })
  await fetch(`/api/revalidate?token=${process.env.NEXT_PUBLIC_SECRETKEY}`)
  return user
}
