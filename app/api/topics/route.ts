import { UserState } from '@/redux/reducers/user'
import prisma from '../prisma'
import { NextResponse } from 'next/server'
import { ENoLogon, ENoNo, SSettingsUpdated } from '../messages'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username")
  if (!username) return NextResponse.json(ENoLogon)

  const topics = await prisma.profile.findUnique({
    where: {
      username: username
    },
    select: {
      topics: true
    }
  })
  if (!topics) return NextResponse.json(ENoNo)
  return NextResponse.json(topics.topics)
}

export async function POST(req: Request) {

  const body = await req.json() as { user: UserState, topic: string, subscribed: boolean }
  const { user, topic, subscribed } = body

  if (!user) return NextResponse.json(ENoLogon)
  if (subscribed) {
    await prisma.profile.update({
      where: { id: user.id },
      data: {
        topics: {
          push: topic
        }
      }
    })
  } else {
    await prisma.profile.findUnique(
      {
        where:
          { id: user.id },
        select: {
          topics: true
        }
      })
      .then(async (subscribed: any) => {
        const newSubscribed = subscribed.topics.filter((top: string) => {
          return top !== topic
        })
        await prisma.profile.update({
          where: { id: user.id },
          data: {
            topics: {
              set: newSubscribed
            }
          }
        })
      })
  }
  return NextResponse.json(SSettingsUpdated)
}

