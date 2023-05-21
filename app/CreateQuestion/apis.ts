"use server";

import { PrismaClient, question } from "@prisma/client";
import { SChangedQuestion, SCreateQuestion, SLike, SLiked } from "../api/messages";

interface LikeProps {
  userid: string;
  question: number;
}

interface VoteProps extends LikeProps {
  option: number;
}

interface EditProps {
  question: question;
  userid: string;
}

const prisma = new PrismaClient();

export async function createQuestionApi(props: Omit<question, "id" | "createdAt">) {
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
      return SCreateQuestion;
    });
  return res;
}

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

export async function like(props: LikeProps) {
  const res = await prisma.question_likes
    .create({
      data: {
        ownerId: props.userid,
        questionId: props.question,
      },
    })
    .then(() => {
      return SLike;
    });
  return res;
}

export async function removeLike(props: LikeProps) {
  const res = await prisma.question_likes
    .deleteMany({
      where: {
        ownerId: props.userid,
        questionId: props.question,
      },
    })
    .then(() => {
      return SLiked;
    });
  return res;
}
