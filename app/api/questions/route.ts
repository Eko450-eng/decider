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

export async function GET() {
  const res = await db.query.Question.findMany({
    with: {
      votes: true,
      likes: true,
      option: true,
    },
    where: () => ne(Question.isDeleted, true),
    orderBy: (Question, { desc }) => [desc(Question.createdAt)],
  });

  return NextResponse.json({ status: 200, data: res });
}

export async function POST(request: NextRequest) {
  const props: questionProps = await request.json();
  const { title, desc, option1, option2, option3, option4, image1, image2, image3, image4, ownerId } = props;

  const res = await db
    .insert(Question)
    .values({
      title: title,
      desc: desc,
      ownerId: ownerId,
      isDeleted: false,
    })
    .then(() => {
      return SCreateQuestion;
    });
  return NextResponse.json(res);
}

export async function PATCH(request: NextRequest) {
  const props: updateProps = await request.json();
  const { title, desc, option1, option2, option3, option4, ownerId, id, isDeleted } = props;

  const res = await db
    .update(Question)
    .set({
      title: title,
      desc: desc,
      ownerId: ownerId,
      isDeleted: isDeleted,
    })
    .where(and(eq(Question.ownerId, ownerId), eq(Question.id, id)))
    .then(() => {
      return SChangedQuestion;
    });
  return NextResponse.json(res);
}
