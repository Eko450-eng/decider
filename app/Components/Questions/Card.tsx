'use client'

import { loginWithToken } from "@/redux/reducers/user";
import { RootState } from "@/redux/userState";
import { Button, Card, Group, Text, Stack, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Question } from "@prisma/client";
import { IconHeartFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { like, vote } from "./logic";

export default function Questioncard({ question }: { question: Question }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!localStorage.getItem("token")) return
    const token = localStorage.getItem("token")
    if (!token) return
    dispatch(loginWithToken(token))
  }, [])

  function handleLike() {
    like(question, user)
      .then((res: any) => {
        showNotification(res.notification)
        if (res.status == 200) router.refresh()
      })
  }

  function handleVote(number: number) {
    vote(question, user, number)
      .then((res: any) => {
        showNotification(res.notification)
        if (res.status === 200) router.refresh()
      })
  }

  return (
    <Card withBorder padding="lg" radius="md" sx={{ margin: "1rem" }}>
      <Stack>
        <Text fw="bold" fz="lg">{question.title}</Text>
        <Text>{question.desc}</Text>
        <Group spacing="sm">
          <Button id="vote1" onClick={() => handleVote(1)}>{question.option1}: {question.votes1.length}</Button>
          <Button id="vote2" onClick={() => handleVote(2)}>{question.option2}: {question.votes2.length}</Button>
        </Group>
        <Group position="right" spacing="xxs">
          <ActionIcon onClick={handleLike}>
            <IconHeartFilled className="like" color="red" />
          </ActionIcon>
          <Text>
            {question.likes.length}
          </Text>
        </Group>
      </Stack>
    </Card>
  )
}
