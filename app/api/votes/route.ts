import db from "@/db/db";
import { Question, QuestionVotes } from "@/db/migrations/schema";
import { VoteProps } from "@/db/types";
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
  } else if (currentState[0].option !== props.option) {
    const res = await db
      .update(QuestionVotes)
      .set({
        option: props.option,
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
              currentState[0].option !== props.option
                ? "You changed your vote"
                : "You have voted",
            color: "green",
          },
        };
      });
    return NextResponse.json(res);
  } else {
    const res = await db
      .delete(QuestionVotes)
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
            message: "Your vote was removed",
            color: "green",
          },
        };
      });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const questionId = Number(searchParams.get("id"));
  const ownerId = searchParams.get("user");

  console.log(ownerId, questionId)
  if (!ownerId) return;
  const res = await db
    .select()
    .from(QuestionVotes)
    .where(
      and(
        eq(QuestionVotes.questionId, questionId),
        eq(QuestionVotes.ownerId, ownerId)
      )
    );
  return NextResponse.json({ voted: res });
}
