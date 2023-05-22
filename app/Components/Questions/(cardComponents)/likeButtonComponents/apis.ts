"use server";

import { SLike, SLiked } from "@/app/api/messages";
import prisma from "@/app/prisma";
import { LikeProps } from "@/prisma/types";

export async function like(props: LikeProps) {
  const res = await prisma.question_likes
    .create({
      data: {
        ownerId: props.userid,
        questionId: props.question,
      },
    })
    .then(() => {
      return SLike;
    });
  return res;
}

export async function removeLike(props: LikeProps) {
  const res = await prisma.question_likes
    .deleteMany({
      where: {
        ownerId: props.userid,
        questionId: props.question,
      },
    })
    .then(() => {
      return SLiked;
    });
  return res;
}
