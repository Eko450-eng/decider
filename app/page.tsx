import Questioncard from "./Components/Questions/Card";
import Loading from "./loading";

async function getData() {
  "use server";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/questions`,
    {
      method: "GET",
      next: {
        revalidate: 1,
        tags: ["main"]
      },
    }
  ).then(async (res) => {
    return await res.json();
  });
  if(!res) return null
  return res;
}

export default async function Home() {
  const data = await getData();

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
          :
          [...Array(20).keys()].map((i: number) => {
              return <Loading key={`placeholder-${i}`}/>;
            })}
      </div>
    </main>
  );
}
