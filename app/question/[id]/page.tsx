"use client";

import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Question } from "@/db/schema/schema";
import { boxVariant } from "@/app/framer";
import Loading from "@/app/loading";
import Questioncard from "@/app/Components/Questions/Card";

export default function QuestionPage({ params }: any) {
  const [data, setData] = useState<Question[]>();

  async function getData() {
    await fetch(
      `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/question?id=${params.id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    ).then(async (res) => {
      setData(await res.json());
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <AnimatePresence>
      <motion.ul
        className="cards-wrapper"
        variants={boxVariant}
        animate="visible"
        initial="hidden"
      >
        <Suspense fallback={<Loading />}>
          {data && (
            /* Subject to change for styling and comments */
            <Questioncard
              index={1}
              unmount={() => getData()}
              question={data[0]}
              data-superjson
            />
          )}
        </Suspense>
      </motion.ul>
    </AnimatePresence>
  );
}
