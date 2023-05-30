import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { SChangedQuestion, SCreateQuestion } from "../messages";
import { Option, Question } from "@/db/migrations/schema";
import { and, eq, ne } from "drizzle-orm";
import { Question as QuestionType } from "@/db/types";

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
    columns: {
      id: true,
    },
    where: () => ne(Question.isDeleted, true),
    orderBy: (Question, { desc }) => [desc(Question.createdAt)],
  });

  return NextResponse.json({ status: 200, data: res });
}

export async function POST(request: NextRequest) {
  const props: questionProps = await request.json();
  const {
    title,
    desc,
    option1,
    option2,
    option3,
    option4,
    image1,
    image2,
    image3,
    image4,
    ownerId,
  } = props;

  async function createOptions(q: QuestionType, name: string, image: string) {
    await db.insert(Option).values({
      name: name,
      questionId: q.id,
      ownerId: ownerId,
      image: image,
    });
  }

  const res = await db
    .insert(Question)
    .values({
      title: title,
      desc: desc,
      ownerId: ownerId,
      isDeleted: false,
    })
    .returning()
    .then(async (q) => {
      if (option1)
        createOptions(q[0], option1, image1).then(() => {
          if (option2)
            createOptions(q[0], option2, image2).then(() => {
              if (option3)
                createOptions(q[0], option3, image3).then(() => {
                  if (option4) createOptions(q[0], option4, image4);
                });
            });
        });
      return SCreateQuestion;
    });

  return NextResponse.json(res);
}

export async function PATCH(request: NextRequest) {
  const props: updateProps = await request.json();
  const {
    title,
    desc,
    ownerId,
    id,
    isDeleted,
  } = props;

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
