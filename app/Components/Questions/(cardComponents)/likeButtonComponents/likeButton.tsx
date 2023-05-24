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
import { QuestionLikes, QuestionWithVotesAndLikes } from "@/db/types";
import { displayMessage } from "../../helpers";

interface IButtonProps {
  question: QuestionWithVotesAndLikes;
}

export default function LikeButton({
  ButtonProps,
}: {
  ButtonProps: IButtonProps;
}) {
  const { question } = ButtonProps;
  const [likeStatus, setLikeStatus] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(question.likes.length);
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

  function changeState() {
    if (likeStatus) {
      changeOptimisticLikes(optimisticLikes.likeCount - 1);
      setLikeStatus(false);
    } else {
      changeOptimisticLikes(optimisticLikes.likeCount + 1);
      setLikeStatus(true);
    }
    block(false);
  }

  async function like() {
    if (!user) return;
    await fetch("/api/likes", {
      method: "POST",
      body: JSON.stringify({
        question: question.id,
        userId: user.id,
      }),
    }).then(async (res: any) => {
      displayMessage(await res.json(), router, false)
      changeState()
    });
  }

  function handleLike() {
    block(true);
    if (!isSignedIn || !question) {
      router.push("/Signin");
      return showNotification(ENoLogon.notification);
    }
    like();
  }

  useEffect(() => {
    if (!isSignedIn) return;
    getLikeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(()=>{
    setLikeCount(question.likes.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])


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
      <Text>{optimisticLikes.likeCount}</Text>
    </Group>
  );
}
