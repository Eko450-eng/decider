import { SLike, SLiked } from "@/app/api/messages";
import prisma from "@/app/prisma";
import { LikeProps } from "@/prisma/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const props: LikeProps = await request.json()

  const res = await prisma.question_likes
    .create({
      data: {
        ownerId: props.userId,
        questionId: props.question,
      },
    })
    .then(() => {
      return SLike;
    });
  return NextResponse.json(res)
}

export async function PUT(request: NextRequest) {
  const props: LikeProps = await request.json()

  const res = await prisma.question_likes
    .deleteMany({
      where: {
        ownerId: props.userId,
        questionId: props.question,
      },
    })
    .then(() => {
      return SLiked;
    });
  return NextResponse.json(res)
}
