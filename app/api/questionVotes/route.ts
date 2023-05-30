import db, { client } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { Question, QuestionVotes } from "@/db/migrations/schema";
import { and, eq, ne, sql } from "drizzle-orm";

export type questionProps = {
  title: string;
  desc: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  ownerId: string;
};

export interface updateProps extends Omit<questionProps, "image1" | "image2"> {
  id: number;
  isDeleted: boolean;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  const option = Number(searchParams.get("option"));

  const res = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(QuestionVotes)
    .where(
      and(eq(QuestionVotes.questionId, id), eq(QuestionVotes.option, option))
    );

  return NextResponse.json({ status: 200, data: res[0].count });
}
