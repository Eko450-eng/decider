import { clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const { user } = await req.json()

  clerkClient.users.updateUser(user.id, {
    publicMetadata: {
      role: 9
    }
  })
  return NextResponse.json({ status: 200 })
}
