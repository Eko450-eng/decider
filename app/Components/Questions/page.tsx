import { Question } from "@prisma/client"
import Questioncard from "./Card"
import CarouselCards from "./Carousel"

async function getQuestions() {

  const returnValue = await fetch(`http://localhost:3000/api/questions`, {
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
