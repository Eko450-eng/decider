import { UserState } from "@/redux/reducers/user";
import { Question } from "@prisma/client"

export async function vote(question: Question, user: UserState, number: number) {
  if (!user.email) return ({ status: 400, title: "Whoops", message: "Please login to vote", color: "red" })

  const res = await fetch('/api/vote', {
    method: "POST",
    body: JSON.stringify({
      id: question.id,
      user: user,
      vote: number
    })
  }).then(async (e: any) => {
    const returnValue = await e.json()
    return (returnValue)
  })
  return res
}

export async function like(question: Question, user: UserState) {
  if (!user.email) return ({ status: 400, notification: { title: "Whoops", message: "Please login to like a vote", color: "red" } })
  const returnValue = await fetch('/api/like', {
    method: "POST",
    body: JSON.stringify({
      id: question.id,
      user: user,
    })
  }).then(async (e: any) => {
    const res = await e.json()
    return res
  })
  await fetch(`/api/revalidate?token=${process.env.NEXT_PUBLIC_SECRETKEY}`)
  return returnValue
}

export async function deleteQuestion(question: Question, user: UserState) {
  const res = await fetch('/api/deleteQuestion', {
    method: "POST",
    body: JSON.stringify({
      question: question,
      user: user,
    })
  }).then(async (e: any) => {
    const returnValue = await e.json()
    return (returnValue)
  })
  await fetch(`/api/revalidate?token=${process.env.NEXT_PUBLIC_SECRETKEY}`)
  return res
}
