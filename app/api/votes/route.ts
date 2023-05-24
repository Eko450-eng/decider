import db from "@/db/db";
import { QuestionVotes } from "@/db/migrations/schema";
import { VoteProps } from "@/prisma/types";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const props: VoteProps = await request.json();

  const currentState = await db
    .select()
    .from(QuestionVotes)
    .where(
      and(
        eq(QuestionVotes.ownerId, props.userId),
        eq(QuestionVotes.questionId, props.question)
      )
    );

  if (currentState.length <= 0) {
    const res = await db
      .insert(QuestionVotes)
      .values({
        option: props.option,
        ownerId: props.userId,
        questionId: props.question,
      })
      .then(() => {
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
    const res = await db
      .update(QuestionVotes)
      .set({
        // remove vote
        option:
          currentState[0].option === props.option
            ? 0
            : // Change vote
              props.option,
      })
      .where(
        and(
          eq(QuestionVotes.ownerId, props.userId),
          eq(QuestionVotes.questionId, props.question)
        )
      )
      .then(() => {
        return {
          status: 200,
          notification: {
            title: "Ok",
            message:
              currentState[0].option === props.option
                ? "Your vote was removed"
                : currentState[0].option !== 0 &&
                  currentState[0].option !== props.option
                ? "You changed your vote"
                : "You have voted",
            color: "green",
          },
        };
      });
    return NextResponse.json(res);
  }
}
