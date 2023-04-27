"use client";
import { ENoLogon } from "@/app/api/messages";
import { Group, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { like } from "../logic";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface IButtonProps {
  questionid: number;
}

export default function LikeButton({
  ButtonProps,
}: {
  ButtonProps: IButtonProps;
}) {
  const { questionid } = ButtonProps;
  const [likeStatus, setLikeStatus] = useState(false);
  const [question, setQuestion] = useState<string[]>([""]);
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter()

  async function getLikeStatus() {
    if (!isSignedIn || !question) return;
    if (question.includes(user.id)) setLikeStatus(true);
    else if (!question.includes(user.id)) setLikeStatus(false);
  }

  function displayMessage(res: any) {
    if (res.notification) showNotification(res.notification);
    getQuestion();
  }

  function handleLike() {
    if (!isSignedIn || !question || !user) {
      router.push("/Signin")
      return showNotification(ENoLogon.notification);
    }
    like(questionid, user.id).then((res: any) => displayMessage(res));
  }

  async function getQuestion() {
    await fetch(
      `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/likes?id=${questionid}`,
      { method: "GET", cache: "no-store" }
    ).then(async (res: any) => {
      const data = await res.json();
      setQuestion(data);
    });
  }

  useEffect(() => {
    getQuestion();
  }, [isLoaded]);

  useEffect(() => {
    getLikeStatus();
  }, [question]);

  return (
    <Group position="right" spacing="xxs">
      <motion.div
        onClick={handleLike}
        className="btn-icon"
        whileTap={{
          rotate: [360, 0, 360, 0],
          scale: [1, 0.9, 1, 0.9, 1],
          transition: {
            duration: 2,
          },
        }}
      >
        <motion.svg
        whileHover={{
          skewX: [0, 10, 0, -10, 0],
          skewY: [0, 10, 0, -10, 0],
          transformOrigin: "bottom",
          transition: {
            duration: .7,
            ease: "linear",
            repeat: Infinity,
          },
        }}
          className={`${likeStatus ? "icon red" : "icon"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 300"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <motion.path
            d="M87.343142,160.394794c15.784075-38.0009,39.10146-54.526807,43.406209-100.085388C142.40289,84.704605,150.141736,129.275174,139.358846,150c.000001,0,11.379414,13.019483,23.299382,10.394794c13.459958-6.352669,26.547418-30.960967,29.07505-47.352227c9.583981,7.572023,17.242849,36.124713,20.850081,47.352227l-49.925132,26.686367q-76.391271-26.686366-75.315085-26.686367Z"
            transform="translate(.000001 0)"
            fill={likeStatus ? "#e41f24" : "gray"}
            stroke={likeStatus ? "#e41f24" : "gray"}
            strokeWidth="0.6"
          />
          <motion.path
            d="M87.343143,160.394794c-20.09329,42.41902.758726,97.897315,62.656857,103.10111c47.398303-1.846542,87.392448-45.815339,62.58336-103.10111-30.164897,8.586323-82.298115,18.085484-125.240217,0Z"
            fill={likeStatus ? "#e41f24" : "gray"}
            stroke={likeStatus ? "#e41f24" : "gray"}
            strokeWidth="0.6"
          />
        </motion.svg>
      </motion.div>
      <Text>{question.length}</Text>
    </Group>
  );
}
