import { Question } from "@prisma/client"
import Questioncard from "./Card"

async function getQuestions() {

  const returnValue = await fetch(`${process.env.SERVER}/api/questions`, {
    method: "GET",
    cache: "no-cache"
  })
  return await returnValue.json()
}

export default async function Page() {
  const data: Question[] = await getQuestions()

  return (
    <div className="cards">
      {data && data.map((v: Question, k: number) => {
        return (
          <Questioncard key={`renderQuestion${k}`} question={v} />
        )
      })}
    </div>
  )
} 
