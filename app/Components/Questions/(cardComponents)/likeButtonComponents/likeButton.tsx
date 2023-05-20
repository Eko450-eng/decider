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
import { displayMessage } from "../../helpers";
import { Question } from "@/db/schema/schema";

interface IButtonProps {
  question: Question;
}

export default function LikeButton({
  ButtonProps,
}: {
  ButtonProps: IButtonProps;
}) {

  const { question } = ButtonProps;
  const [likeStatus, setLikeStatus] = useState(false);
  // const [question, setQuestion] = useState<string[]>([""]);
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  async function getLikeStatus() {
    if (!isSignedIn || !question) return;
    if (question.likes.includes(user.id)) setLikeStatus(true);
    else if (!question.likes.includes(user.id)) setLikeStatus(false);
  }

  function handleLike() {
    if (!isSignedIn || !question) {
      router.push("/Signin");
      return showNotification(ENoLogon.notification);
    }
    // Mutate Optimistic
    if (question.likes.includes(user.id)) {
      changeOptimisticLikes(optimisticLikes.likeCount - 1);
      setLikeStatus(false);
    } else if (!question.likes.includes(user.id)) {
      changeOptimisticLikes(optimisticLikes.likeCount + 1);
      setLikeStatus(true);
    }
    // Run requestes
    like(question.id, user.id)
      // Update with actual value
      .then((res: any) => displayMessage(res, router));
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
      <Text>{optimisticLikes.likeCount}   </Text>
    </Group>
  );
}
