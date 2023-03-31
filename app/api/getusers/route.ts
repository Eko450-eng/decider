import { Profile } from '@prisma/client'
import bcrypt from 'bcryptjs-react'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from "../prisma"
import { ENoNo, EWrongPassword, EWrongUsername } from '../messages'

export async function POST(request: Request) {
  const body = await request.json() as Profile
  const { username, password } = body


  const res = await prisma.profile.findUnique({
    where: {
      username: username
    }
  })
    .then(async (e: any) => {
      if (!e) return EWrongUsername
      const user = await e as Profile
      const comparedPass = bcrypt.compareSync(password, user.password)
      if (!comparedPass) return EWrongPassword

      if (e.length < 1) return ENoNo

      if (!process.env.JWT_TOKEN) return { status: 501, notification: { title: "Big woops", message: "That's my bad please contact me about this", color: "red" } }
      const token = jwt.sign(e, process.env.JWT_TOKEN)

      return { status: 200, user: e, token: token, notification: { title: "Welcome", message: "Hope you enjoy your stay", color: "green" } }
    })
  return NextResponse.json(res)
}
