'use client'
import { Question } from "@prisma/client"
import Questioncard from "./Card"
import { useEffect, useState } from "react"

async function getQuestions() {
  const res = await fetch(`/api/questions`, {
    method: "GET",
    cache: "no-cache",
  })
  return await res.json()
}

export default function Page() {
  // const data: Question[] = await getQuestions()
  const [data, setData] = useState<Question[] | null>(null)

  async function getQuestion() {
    const question = await getQuestions()
    setData(question)
  }
  useEffect(() => {
    getQuestion()
  }, [])

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
