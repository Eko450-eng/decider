import { Question } from "@/db/types";
import Questioncard from "./Components/Questions/Card";
import Loading from "./loading";

async function getData() {
  const res = await fetch("http://localhost:3000/api/questions", {
    method: "GET",
    cache: "no-store",
    next: {
      tags: ["questions"]
    }
  });

  return await res.json();
}

export default async function Home() {
  const { data }: { data: Question[] } = await getData();

  return (
    <main className="main">
      <div className="cards-wrapper">
        {data
          ? data.map((v: any, k: number) => {
              const { createdAt, ...question } = v;
              return (
                <Questioncard
                  key={`questionCard-${k}`}
                  index={k}
                  question={question}
                  data-superjson
                />
              );
            })
          : [...Array(20).keys()].map((i: number) => {
              return <Loading key={`placeholder-${i}`} />;
            })}
      </div>
    </main>
  );
}
