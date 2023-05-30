import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { SChangedQuestion, SCreateQuestion } from "../messages";
import { Question } from "@/db/migrations/schema";
import { and, eq, ne } from "drizzle-orm";

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
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get("id"))
  const res = await db.query.Question.findFirst({
    with: {
      votes: true,
    },
    where: () => eq(Question.id, id),
    orderBy: (Question, { desc }) => [desc(Question.createdAt)],
  });

  return NextResponse.json({ status: 200, data: res });
}
