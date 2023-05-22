"use server";

import prisma from "@/app/prisma";
import { VoteProps } from "@/prisma/types";

export async function voteApi(props: VoteProps) {
  const res = await prisma.question_votes
    .create({
      data: {
        option: props.option,
        ownerId: props.userid,
        questionId: props.question,
      },
    })
    .then(() => {
      return {
        notification: {
          title: "Ok",
          message: "You have voted",
          color: "green",
        },
      };
    });
  return res;
}

export async function removeVote(props: VoteProps) {
  const res = await prisma.question_votes
    .deleteMany({
      where: {
        ownerId: props.userid,
        questionId: props.question,
      },
    })
    .then(() => {
      return {
        notification: {
          title: "Ok",
          message: "You have removed your vote",
          color: "red",
        },
      };
    });
  return res;
}
