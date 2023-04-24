"use client";
import Questioncard from "./Components/Questions/Card";
import { Suspense, useEffect, useState } from "react";
import { Question } from "@/db/schema/schema";
import { motion } from "framer-motion";
import { boxVariant } from "./framer";
import Loading from "./loading";

export default function Home() {
  const [data, setData] = useState<Question[]>();
  async function getData() {
    await fetch(
      `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/questions`,
      { method: "GET", cache: "no-store" },
    )
      .then(async (res) => {
        setData(await res.json());
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="main">
      <motion.ul
        className="cards"
        variants={boxVariant}
        animate="visible"
        initial="hidden"
      >
        {data && data.map((v: any, k: number) => {
          const { createdAt, ...question } = v;
          return (
            <Suspense key={`questionCard-${k}`} fallback={<Loading />}>
              <Questioncard
                question={question}
                data-superjson
              />
            </Suspense>
          );
        })}
      </motion.ul>
    </main>
  );
}
