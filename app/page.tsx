"use client";
import { useEffect, useState } from "react";
import Questioncard from "./Components/Questions/Card";
import Loading from "./loading";
import { IQuestionWithVotesAndLikes } from "@/prisma/types";

export default function Home() {
  const [data, setData] = useState<IQuestionWithVotesAndLikes[] | null>(null);

  async function getData() {
    const res = await fetch("/api/questions", {
      method: "GET",
      cache: "no-store",
    });
    setData(await res.json());
  }

  useEffect(() => {
    getData();
  });

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
