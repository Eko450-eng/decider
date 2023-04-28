import { Question } from "@/db/schema/schema";

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
  await fetch("/api/revalidate?main=main");
  return res;
}

export async function editQuestion(values: {
  userid: string;
  id: number;
  title: string;
  desc: string | null;
  option1: string;
  option2: string;
}) {
  const { userid, id, title, desc, option1, option2 } = values;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/questions/edit`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userid,
        id: id,
        title: title,
        desc: desc,
        option1: option1,
        option2: option2,
      }),
    }
  ).then(async (e: any) => {
    const returnValue = await e.json();
    return returnValue;
  });
  await fetch("/api/revalidate?main=main");
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
  ).then(async (e: any) => {
    const res = await e.json();
    return res;
  });
  await fetch("/api/revalidate?main=main");
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
