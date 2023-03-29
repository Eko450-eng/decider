// import { Question } from "@prisma/client"
// import Questioncard from "./Card"
// import { Suspense } from "react"
// import Loading from "./loading"

// async function getQuestions() {

//   const res = await fetch(`${process.env.API_SERVER}/api/questions`, {
//     method: "GET",
//     cache: "no-cache",
//   })
//   return await res.json()
// }

// export default async function Page() {
//   const data: Question[] = await getQuestions()

//   return (
//     <div className="cards">
//       <Suspense fallback={<Loading />}>
//         {data && data.map((v: Question, k: number) => {
//           return (
//             <Questioncard key={`renderQuestion${k}`} question={v} />
//           )
//         })}
//       </Suspense>
//     </div>
//   )
// } 
