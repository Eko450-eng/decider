import db from "@/db/db"
import Questioncard from "./Components/Questions/Card"
import { Question } from "@/db/schema/schema"
import { desc } from "drizzle-orm/expressions"

export const dynamic = "force-dynamic"
export const revalidate = 1

const questionsQuery = db.select().from(Question).orderBy(desc(Question.createdAt)).prepare("getQuestions")

async function getQuestions(): Promise<Question[]> {
  const questions = questionsQuery.execute()
  return questions
}

export default async function Home() {
  const data = await getQuestions()

  return (
    <main className="main">
      <div className="cards">
        {data && data.map((v: any, k: number) => {
          let { createdAt, ...question } = v
          return (
            <Questioncard key={`renderQuestion${k}`} question={question} data-superjson />
          )
        })}
      </div>
    </main>
  )
} 
