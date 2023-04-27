"use client";

import Questioncard from "./Components/Questions/Card";
import { Suspense, useEffect, useState } from "react";
import { Question } from "@/db/schema/schema";
import { AnimatePresence, motion } from "framer-motion";
import { boxVariant } from "./framer";
import Loading from "./loading";

export default function Home() {
  const [data, setData] = useState<Question[]>();
  async function getData() {
    await fetch(`${process.env.NEXT_PUBLIC_HOSTING_SERVER}/questions`, { method: "GET", cache: "no-store", }).then(async (res) => {
      setData(await res.json());
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="main">
      <AnimatePresence>
        <motion.ul
          className="cards-wrapper"
          variants={boxVariant}
          animate="visible"
          initial="hidden"
        >
          {data &&
            data.map((v: any, k: number) => {
              const { createdAt, ...question } = v;
              return (
                <Suspense key={`questionCard-${k}`} fallback={<Loading />}>
                  <Questioncard
                    index={k}
                    unmount={() => getData()}
                    question={question}
                    data-superjson
                  />
                </Suspense>
              );
            })}
        </motion.ul>
      </AnimatePresence>
    </main>
  );
}
