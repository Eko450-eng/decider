import { Question } from "@prisma/client"
import Questioncard from "./Card"
import prisma from '../../api/prisma'
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function getQuestions() {
  const questions = await prisma.question.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })
  return questions.map(({ createdAt, ...rest }) => ({ ...rest, createdAt: createdAt.toDateString() }))
}

export default async function Page() {
  const data = await getQuestions()

  return (
    <div className="cards">
      {data && data.map((v: any, k: number) => {
        return (
          <Questioncard key={`renderQuestion${k}`} question={v} data-superjson />
        )
      })}
    </div>
  )
} 
