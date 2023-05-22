"use server"
 
import { question } from "@prisma/client";


export async function createQuestionApi(props: Omit<question, "id" | "createdAt">) {
  // const res = prisma.question
  //   .create({
  //     data: {
  //       title: props.title,
  //       desc: props.desc,
  //       option1: props.option1,
  //       option2: props.option2,
  //       image1: props.image1 ? props.image1 : null,
  //       image2: props.image2 ? props.image2 : null,
  //       ownerId: props.ownerId,
  //     },
  //   })
  //   .then(() => {
  //     return SCreateQuestion;
  //   });
  // return res;
  return {WOOP: "WOOP"}
}
