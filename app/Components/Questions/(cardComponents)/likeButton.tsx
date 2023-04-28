"use client";
import { ENoLogon } from "@/app/api/messages";
import { Group, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { like } from "../logic";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const iconColors = {
  unLiked: "#003049",
  liked: "#e41f24"
}

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
  const router = useRouter();

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
      router.push("/Signin");
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
    <Group spacing="xxs">
      <motion.div
        onClick={handleLike}
        className="btn-icon"
        whileTap={{
          rotate: [360, 0],
          scale: [1, 0.9],
          transition: {
            duration: 2,
            repeat: 1
          },
        }}
      >
        <motion.svg
          whileHover={{
            skewX: [0, 10, 0, -10, 0],
            skewY: [0, 10, 0, -10, 0],
            transformOrigin: "bottom",
            transition: {
              duration: 0.4,
              ease: "linear",
              repeat: 1,
            },
          }}
          className={`${likeStatus ? "icon-hot red" : "icon-hot"}`}
          viewBox="0 0 220 312"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M109.171 146.264C108.883 146.69 108.966 147.266 109.362 147.594C120.518 156.831 131.068 161.73 143.071 156.928C149.002 154.556 155.189 149.847 161.923 142.329C168.467 135.023 175.567 125.019 183.485 111.813C191.773 121.502 200.497 136.789 207.232 153.133C214.213 170.074 219 188.012 219 201.882C219 230.822 207.516 258.577 187.074 279.041C166.633 299.504 138.908 311 110 311C81.0918 311 53.3673 299.504 32.9257 279.041C12.4842 258.577 1 230.822 1 201.882C1 169.831 15.0959 133.745 37.3832 110.815C38.1805 109.996 38.9909 109.167 39.8123 108.326C61.7987 85.8161 91.7254 55.1773 92.645 2.49664C101.6 12.5221 114.06 34.339 120.488 60.1639C127.325 87.6316 127.287 119.424 109.171 146.264Z"
            fill={likeStatus ? iconColors.liked : "#ffffff"}
            stroke={likeStatus ? iconColors.liked : "#ffffff"}
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            whileHover={{
              fill: "#e41f24",
              stroke: "#e41f24"
            }}
          />
        </motion.svg>
      </motion.div>
      <Text>{question.length}</Text>
    </Group>
  );
}
