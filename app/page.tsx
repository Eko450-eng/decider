import Questioncard from "./Components/Questions/Card";
import Loading from "./loading";

async function getData() {
  const URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_HOSTURL;
  const res = await fetch(`${URL}/api/questions`, {
    method: "GET",
    cache: "no-store",
    next: {
      tags: ["questions"],
    },
  });

  return await res.json();
}

export default async function Home() {
  const { data }: { data: any } = await getData();

  return (
    <main className="main">
      {/*@ts-ignore*/}
      <div className="cards-wrapper">
        {data
          ? data.map((question: {id: number}, k: number) => {
              return (
                <Questioncard
                  key={`questionCard-${k}`}
                  index={k}
                  questionId={question.id}
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
