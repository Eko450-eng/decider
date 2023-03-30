import Questioncard from "./Components/Questions/Card"
import prisma from "./api/prisma"

export const dynamic = "force-dynamic"
export const revalidate = 2

async function getQuestions() {
  const questions = await prisma.question.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })
  // This totally breaks typesafety but until I have a solution to turn JSDate into plain Object this has to do
  return questions.map(({ createdAt, ...rest }) => ({ ...rest, createdAt: createdAt.toDateString() }))
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
