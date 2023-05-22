import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { VoteProps } from "@/prisma/types";
import { ArrowWaveLeftUp } from "tabler-icons-react";

const prisma = new PrismaClient();

export async function POST(request: NextRequest, response: NextResponse) {
  const props: VoteProps = await request.json();

  const currentState = await prisma.question_votes.findFirst({
    where: {
      questionId: props.question,
      ownerId: props.userId,
    },
  });

  if (!currentState) {
    const res = await prisma.question_votes
      .create({
        data: {
          option: props.option,
          ownerId: props.userId,
          questionId: props.question,
        },
      })
      .then(() => {
        prisma.$disconnect;
        return {
          status: 200,
          notification: {
            title: "Ok",
            message: "You have voted",
            color: "green",
          },
        };
      });
    return NextResponse.json(res);
  } else {
    const res = await prisma.question_votes
      .upsert({
        where: { id: currentState.id },
        // Update the vote
        update: {
          option:
            // remove vote
            currentState.option === props.option
              ? 0
              : // Change vote
                props.option,
        },
        // Create vote
        create: {
          option: props.option,
          ownerId: props.userId,
          questionId: props.question,
        },
      })
      .then(() => {
        prisma.$disconnect;
        return {
          status: 200,
          notification: {
            title: "Ok",
            message:
              currentState.option === props.option
                ? "Your vote was removed"
                : currentState.option !== 0 &&
                  currentState.option !== props.option
                ? "You changed your vote"
                : "You have voted",
            color: "green",
          },
        };
      });
    return NextResponse.json(res);
  }
}
