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
import { IQuestionWithLikes } from "@/prisma/types";
import { QuestionLikes } from "@/db/types";
import { displayMessage } from "../../helpers";

interface IButtonProps {
  question: IQuestionWithLikes;
}

export default function LikeButton({
  ButtonProps,
}: {
  ButtonProps: IButtonProps;
}) {
  const { question } = ButtonProps;
  const [likeStatus, setLikeStatus] = useState<boolean>(false);
  const [blocked, block] = useState<boolean>(false);
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  async function getLikeStatus() {
    if (!isSignedIn || !question) return;
    question.likes.map((like: QuestionLikes) => {
      if (like.ownerId === user.id) {
        setLikeStatus(true);
      }
    });
  }

  async function dislike() {
    if (!user) return;
    changeOptimisticLikes(optimisticLikes.likeCount + 1);
    await fetch("/api/likes", {
      method: "POST",
      body: JSON.stringify({
        question: question.id,
        userId: user.id,
      }),
    }).then((res: any) => {
    setLikeStatus(true);
      displayMessage(res, router, false);
      block(false);
    });
  }

  async function like() {
    if (!user) return;
    changeOptimisticLikes(optimisticLikes.likeCount - 1);
    await fetch("/api/likes", {
      method: "POST",
      body: JSON.stringify({
        question: question.id,
        userId: user.id,
      }),
    }).then((res: any) => {
      displayMessage(res, router, false);
      setLikeStatus(false);
      block(false);
    });
  }

  function handleLike() {
    block(true);
    if (!isSignedIn || !question) {
      router.push("/Signin");
      return showNotification(ENoLogon.notification);
    }
    if (likeStatus) like();
    else if (!likeStatus) dislike();
  }

  useEffect(() => {
    getLikeStatus();
  }, [isLoaded]);

  const likeCount = question.likes.length;

  const [optimisticLikes, changeOptimisticLikes] = useOptimistic(
    { likeCount },
    (state, newLikeCount: number) => ({
      ...state,
      likeCount: newLikeCount,
    })
  );

  return (
    <Group spacing="xxs">
      <motion.div
        onClick={async () => {
          if (blocked) return;
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
