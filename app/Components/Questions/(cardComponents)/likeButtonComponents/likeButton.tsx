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
import { displayMessage } from "../../helpers";
import { like, removeLike } from "@/app/CreateQuestion/apis";
import { IQuestionWithLikes } from "@/prisma/types";

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
    question.likes.map((like) => {
      if (like.ownerId === user.id) {
        setLikeStatus(true);
      }
    });
  }

  function handleLike() {
    block(true);
    if (!isSignedIn || !question) {
      router.push("/Signin");
      return showNotification(ENoLogon.notification);
    }
    // Mutate Optimistic
    if (likeStatus) {
      removeLike({ question: question.id, userid: user.id }).then(
        (res: any) => {
          displayMessage(res, router);
          block(false);
        }
      );
      changeOptimisticLikes(optimisticLikes.likeCount - 1);
      setLikeStatus(false);
    } else if (!likeStatus) {
      like({ question: question.id, userid: user.id }).then((res: any) => {
        displayMessage(res, router);
        block(false);
      });
      changeOptimisticLikes(optimisticLikes.likeCount + 1);
      setLikeStatus(true);
    }
  }

  useEffect(() => {
    getLikeStatus();
  }, [isLoaded]);

  const likeCount = question.likes.length;

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
      <Text>{optimisticLikes.likeCount} </Text>
    </Group>
  );
}
