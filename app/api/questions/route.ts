import { PrismaClient, question } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { SCreateQuestion } from "../messages";

const prisma = new PrismaClient()

export async function GET(){
  const questions = await prisma.question.findMany({
    include: {
      votes: true,
      likes: true,
    },
    where: {
      isDeleted: false,
    },
  });
  return NextResponse.json(questions);
}

export async function POST(request: NextRequest){
  const props: Omit<question, "id" | "createdAt"> = await request.json()
  const res = prisma.question
    .create({
      data: {
        title: props.title,
        desc: props.desc,
        option1: props.option1,
        option2: props.option2,
        image1: props.image1 ? props.image1 : null,
        image2: props.image2 ? props.image2 : null,
        ownerId: props.ownerId,
      },
    })
    .then(() => {
      prisma.$disconnect
      return SCreateQuestion;
    });
  return NextResponse.json(res);
}
