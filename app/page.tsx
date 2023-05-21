import { PrismaClient } from "@prisma/client";
import Questioncard from "./Components/Questions/Card";
import Loading from "./loading";
import { Maintenance } from "./maintenance";

const prisma = new PrismaClient();

async function getPrisma() {
  const questions = await prisma.question.findMany({
    include: {
      votes: true,
      likes: true,
    },
    where: {
      isDeleted: false,
    },
  });

  return questions;
}

export default async function Home() {
  const data = await getPrisma();

  return (
    <main className="main">
      {process.env.NEXT_PUBLIC_MAINTENANCE ? (
        <Maintenance />
      ) : (
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
      )}
    </main>
  );
}
