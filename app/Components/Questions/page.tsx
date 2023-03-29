'use client'
import { Question } from "@prisma/client"
import Questioncard from "./Card"
import { Suspense, useEffect, useState } from "react"
import Loading from "./loading"


export default function Page() {
  const [data, setData] = useState<null | Question[]>(null)

  async function getQuestions() {
    const res = await fetch(`/api/questions`, {
      method: "GET",
      cache: "no-store",
      next: {
        revalidate: 1
      }
    })
    const result = await res.json()
    if (!result) return
    setData(result)
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div className="cards">
      <Suspense fallback={<Loading />}>
        {data && data.map((v: Question, k: number) => {
          return (
            <Questioncard key={`renderQuestion${k}`} question={v} />
          )
        })}
      </Suspense>
    </div>
  )
} 
