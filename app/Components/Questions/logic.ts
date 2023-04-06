import { Question } from "@/db/schema/schema"

export async function vote(question: Question, userid: string, number: number) {
  const res = await fetch('/api/questions/vote', {
    method: "POST",
    body: JSON.stringify({
      questionId: question.id,
      userId: userid,
      vote: number ? number : 0
    })
  }).then(async (e: any) => {
    const returnValue = await e.json()
    return (returnValue)
  })
  return res
}

export async function like(question: Question, user: string) {
  const res = await fetch('/api/questions/like', {
    method: "POST",
    body: JSON.stringify({
      questionId: question.id,
      userId: user,
    })
  }).then(async (e: any) => {
    const res = await e.json()
    return res
  })
  return res
}

export async function deleteQuestion(question: Question, userId: string) {
  const res = await fetch('/api/questions/deleteQuestion', {
    method: "POST",
    body: JSON.stringify({
      questionId: question.id,
      userId: userId,
    })
  }).then(async (e: any) => {
    const returnValue = await e.json()
    return (returnValue)
  })
  return res
}
