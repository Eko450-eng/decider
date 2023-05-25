import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { SCreateQuestion } from "../messages";
import { Question } from "@/db/migrations/schema";
import { eq, ne } from "drizzle-orm";

type questionProps = {
  title: string;
  desc: string;
  option1: string;
  option2: string;
  image1: string;
  image2: string;
  ownerId: string;
};

export async function GET() {
  const res = await db.query.Question.findMany({
    with: {
      likes: true,
      votes: true,
    },
    where: (table, {sql}) => ne(Question.isDeleted, true),
    orderBy: (Question, { desc }) => [desc(Question.createdAt)],
  });
  console.log(res)

  return NextResponse.json({ status: 200, data: res });
}

export async function POST(request: NextRequest) {
  const props: questionProps = await request.json();
  const { title, desc, option1, option2, image1, image2, ownerId } = props;

  // TODO: Use S3 Buckets or some other storage alternative for images
  const res = await db
    .insert(Question)
    .values({
      title: title,
      desc: desc,
      option1: option1,
      option2: option2,
      ownerId: ownerId,
      image1: image1,
      image2: image2,
      isDeleted: false,
    })
    .then(() => {
      return SCreateQuestion;
    });
  return NextResponse.json(res);
}
