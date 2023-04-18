import { Question } from "@/db/schema/schema"

export async function vote(question: Question, userid: string, number: number) {
  const res = await fetch('/api/questions', {
    method: "PATCH",
    body: JSON.stringify({
      questionId: question.id,
      userId: userid,
      vote: number ? number : 0,
      type: "vote"
    })
  }).then(async (e: any) => {
    const returnValue = await e.json()
    return (returnValue)
  })
  return res
}

export async function like(question: Question, user: string) {
  const res = await fetch('/api/questions', {
    method: "PATCH",
    body: JSON.stringify({
      questionId: question.id,
      userId: user,
      type: "like"
    })
  }).then(async (e: any) => {
    const res = await e.json()
    return res
  })
  return res
}

export async function deleteQuestion(question: Question, userId: string) {
  const res = await fetch(`/api/questions?userid=${userId}&questionid=${question.id}`, { method: "DELETE", })
    .then(async (e: any) => {
      const returnValue = await e.json()
      return (returnValue)
    })
  return res
}
