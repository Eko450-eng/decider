import db from "@/db/db"
import Questioncard from "./Components/Questions/Card"
import { Question } from "@/db/schema/schema"
import { desc } from "drizzle-orm/expressions"

export const dynamic = "force-dynamic"
export const revalidate = 1

async function getQuestions() {
  const questions = await db.select().from(Question).orderBy(desc(Question.createdAt))
  return questions
}

export default async function Home() {
  const data = await getQuestions()

  return (
    <main className="main">
      <div className="cards">
        {data && data.map((v: any, k: number) => {
          return (
            <Questioncard key={`renderQuestion${k}`} question={v} data-superjson />
          )
        })}
      </div>
    </main>
  )
} 
