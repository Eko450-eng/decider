import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { SLike, SLiked } from "../messages";
import { QuestionLikes } from "@/db/migrations/schema";
import { LikeProps } from "@/db/types";

export async function POST(request: NextRequest) {
  const props: LikeProps = await request.json();

  const currentstate = await db
    .select()
    .from(QuestionLikes)
    .where(
      and(
        eq(QuestionLikes.ownerId, props.userId),
        eq(QuestionLikes.questionId, props.question)
      )
    );

  if (currentstate.length <= 0) {
    const res = await db
      .insert(QuestionLikes)
      .values({
        questionId: props.question,
        ownerId: props.userId,
      })
      .then(() => {
        return SLike;
      });

    return NextResponse.json(res)
  } else {
    const res = await db
      .delete(QuestionLikes)
      .where(
        and(
          eq(QuestionLikes.ownerId, props.userId),
          eq(QuestionLikes.questionId, props.question)
        )
      )
      .then(() => {
        return SLiked;
      });
    return NextResponse.json(res)
  }
}
