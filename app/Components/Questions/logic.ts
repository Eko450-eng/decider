import { editQuestionApi } from "@/app/CreateQuestion/apis";
import { Question } from "@/db/schema/schema";
import { displayMessage } from "./helpers";

interface EditProps {
  userid: string;
  id: number;
  title: string;
  desc: string | null;
  option1: string;
  option2: string;
}

export async function vote(questionid: number, userid: string, number: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/questions`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: questionid,
        userId: userid,
        vote: number ? number : 0,
        type: "vote",
      }),
    }
  ).then(async (e: any) => {
    const returnValue = await e.json();
    return returnValue;
  });
  return res;
}

export async function like(questionid: number, user: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/questions`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: questionid,
        userId: user,
        type: "like",
      }),
    }
  )
    .then(async (event: any) => {
      const res = await event.json();
      return res;
    })
    .catch((err: any) => {
      console.log(err);
    });
  return res;
}

export async function deleteQuestion(question: Question, userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/questions?userid=${userId}&questionid=${question.id}`,
    { method: "DELETE" }
  ).then(async (e: any) => {
    const returnValue = await e.json();
    await fetch("/api/revalidate?main=main");
    return returnValue;
  });
  return res;
}
