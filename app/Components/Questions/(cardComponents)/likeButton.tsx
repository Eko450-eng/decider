'use client'
import { ENoLogon } from "@/app/api/messages";
import { ActionIcon, Group, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconHeartFilled } from "@tabler/icons-react";
import { like } from "../logic";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface IButtonProps {
  questionid: number
}

export default function LikeButton({ ButtonProps }: { ButtonProps: IButtonProps }) {
  const { questionid } = ButtonProps
  const [likeStatus, setLikeStatus] = useState(false)
  const [question, setQuestion] = useState<string[]>([""])
  const { user, isSignedIn, isLoaded } = useUser()

  async function getLikeStatus() {
    if (!isSignedIn || !question) return
    if (question.includes(user.id)) setLikeStatus(true)
    else if (!question.includes(user.id)) setLikeStatus(false)
  }

  function displayMessage(res: any) {
    if (res.notification) showNotification(res.notification)
    getQuestion()
  }

  function handleLike() {
    if (!isSignedIn || !question || !user) return showNotification(ENoLogon.notification)
    like(questionid, user.id).then((res: any) => displayMessage(res))
  }

  async function getQuestion() {
    await fetch(`${process.env.NEXT_PUBLIC_HOSTING_SERVER}/likes?id=${questionid}`, { method: "GET", cache: "no-store" })
      .then(async (res: any) => {
        const data = await res.json()
        setQuestion(data)
      })
  }

  useEffect(() => {
    getQuestion()
  }, [isLoaded])

  useEffect(() => {
    getLikeStatus()
  }, [question])

  return (
    <Group position="right" spacing="xxs">
      <ActionIcon onClick={handleLike}>
        <IconHeartFilled className={`${likeStatus ? "icon red" : "icon"}`} />
      </ActionIcon>
      <Text>
        {question.length}
      </Text>
    </Group>
  )
}

