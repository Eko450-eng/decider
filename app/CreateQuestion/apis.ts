"use server";

import { PrismaClient, question } from "@prisma/client";
import { ImageState } from "./page";
import { SChangedQuestion, SCreateQuestion } from "../api/messages";

interface VoteProps {
  userid: string;
  question: number;
  option: number;
}

interface QuestionProps {
  question: {
    title: string;
    desc: string;
    option1: string;
    option2: string;
  };
  userid: string;
  images?: ImageState;
}

interface EditProps {
  userid: string;
  id: number;
  title: string;
  desc: string | null;
  option1: string;
  option2: string;
  isDeleted: boolean;
}

const prisma = new PrismaClient();

export async function createQuestionApi(props: QuestionProps) {
  const { userid, question, images } = props;
  const { desc, title, option1, option2 } = question;
  const res = prisma.question
    .create({
      data: {
        title: title,
        desc: desc,
        option1: option1,
        option2: option2,
        image1: images ? images.image1 : null,
        image2: images ? images.image2 : null,
        ownerId: userid,
      },
    })
    .then(() => {
      return SCreateQuestion;
    });
  return res;
}

export async function editQuestionApi(props: EditProps) {
  const { id, userid, option2, option1, desc, title, isDeleted } = props;

  const res = prisma.question
    .update({
      where: {
        id: id,
      },
      data: {
        ownerId: userid,
        title: title,
        desc: desc,
        option1: option1,
        option2: option2,
        isDeleted: isDeleted,
      },
    })
    .then(() => {
      return SChangedQuestion;
    });
  return res;
}

export async function voteApi(props: VoteProps) {
  const res = await prisma.question_votes
    .create({
      data: {
        option: props.option,
        ownerId: props.userid,
        questionId: props.question,
      },
    })
    .then(() => {
      return {
        notification: {
          title: "Ok",
          message: "You have voted",
          color: "green",
        },
      };
    });
  return res;
}

export async function removeVote(props: VoteProps) {
  const res = await prisma.question_votes
    .deleteMany({
      where: {
        ownerId: props.userid,
        questionId: props.question,
      },
    })
    .then(() => {
      return {
        notification: {
          title: "Ok",
          message: "You have removed your vote",
          color: "red",
        },
      };
    });
  return res;
}
