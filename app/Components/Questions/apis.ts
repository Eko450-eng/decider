"use server"

import { SChangedQuestion } from "@/app/api/messages";
import prisma from "@/app/prisma";
import { EditProps } from "@/prisma/types";


export async function editQuestionApi(props: EditProps) {
  const res = prisma.question
    .update({
      where: {
        id: props.question.id,
      },
      data: {
        ownerId: props.userid,
        title: props.question.title,
        desc: props.question.desc,
        option1: props.question.option1,
        option2: props.question.option2,
        isDeleted: props.question.isDeleted,
      },
    })
    .then(() => {
      return SChangedQuestion;
    });
  return res;
}

