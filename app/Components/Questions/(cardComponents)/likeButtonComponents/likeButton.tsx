"use client";
import { ENoLogon } from "@/app/api/messages";
import { Group, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import LikeSvg from "./LikeSvg";
import { experimental_useOptimistic as useOptimistic } from "react";
import { like } from "../../logic";

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
    if (user && question.includes(user.id)) {
      changeOptimisticLikes(optimisticLikes.likeCount - 1);
      setLikeStatus(false);
    } else if (user && !question.includes(user.id)) {
      changeOptimisticLikes(optimisticLikes.likeCount + 1);
      setLikeStatus(true);
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

  const likeCount = question.length;

  const [optimisticLikes, changeOptimisticLikes] = useOptimistic(
    { likeCount, likeStatus },
    (state, newLikeCount: number) => ({
      ...state,
      likeCount: newLikeCount,
    })
  );

  return (
    <Group spacing="xxs">
      <motion.div
        onClick={async () => {
          handleLike();
        }}
        className="btn-icon"
        whileTap={{
          rotate: [360, 0],
          scale: [1, 0.9],
          transition: {
            duration: 2,
            repeat: 1,
          },
        }}
      >
        <LikeSvg likeStatus={likeStatus ? true : false} />
      </motion.div>
      <Text>{likeStatus}</Text>
      <Text>{optimisticLikes.likeCount}</Text>
    </Group>
  );
}
