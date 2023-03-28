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

export default function Questioncard({ question }: { question: Question }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem("token")) return
    const token = localStorage.getItem("token")
    if (!token) return
    dispatch(loginWithToken(token))
  }, [])

  const router = useRouter()
  const user = useSelector((state: RootState) => state.user)

  async function vote(number: number) {
    if (!user.email) showNotification({ title: "Whoops", message: "Please login to vote", color: "red" })
    await fetch('/api/vote', {
      method: "POST",
      body: JSON.stringify({
        id: question.id,
        user: user,
        vote: number
      })
    }).then(async (e: any) => {
      const returnValue = await e.json()

      if (returnValue.status == 200) {
        showNotification(returnValue)
        router.refresh()
      }
    })
  }

  async function like() {
    if (!user.email) showNotification({ title: "Whoops", message: "Please login to like a vote", color: "red" })
    await fetch('/api/like', {
      method: "POST",
      body: JSON.stringify({
        id: question.id,
        user: user,
      })
    }).then(async (e: any) => {
      const res = await e.json()
      if (res.status !== 200) {
        showNotification(res)
      }
      router.refresh()
    })
  }

  return (
    <Card withBorder padding="lg" radius="md" sx={{ margin: "1rem" }}>
      <Stack>
        <Text fw="bold" fz="lg">{question.title}</Text>
        <Text>{question.desc}</Text>
        <Group spacing="sm">
          <Button onClick={() => vote(1)}>{question.option1}: {question.votes1.length}</Button>
          <Button onClick={() => vote(2)}>{question.option2}: {question.votes2.length}</Button>
        </Group>
        <Group position="right" spacing="xxs">
          <ActionIcon onClick={like}>
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
