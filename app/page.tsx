import db from "@/db/db"
import Questioncard from "./Components/Questions/Card"
import { Suspense } from "react"
import { Question } from "@/db/schema/schema"
import { desc } from "drizzle-orm"

const questionsQuery = db.select({ id: Question.id })
  .from(Question)
  .orderBy(desc(Question.createdAt))
  .prepare("questions")

async function getData() {
  const questions = await questionsQuery.execute()
  return questions
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="main">
      <div className="cards">
        {data && data.map((v: any, k: number) => {
          return (
            <Suspense key={`renderQuestionSuspens${k}`} fallback={<p>Loading.....</p>}>
              <Questioncard key={`renderQuestion${k}`} questionId={v.id} data-superjson />
            </Suspense>
          )
        })}
      </div>
    </main>
  )
} 
