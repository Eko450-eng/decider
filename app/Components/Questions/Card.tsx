'use client'

import { useAuth } from '@clerk/nextjs'
import { Button, Card, Group, Text, Stack, ActionIcon, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconHeartFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { like, vote, deleteQuestion } from "./logic";
import { Trash, X } from "tabler-icons-react";
import { ENoLogon } from '@/app/api/messages';
import { Question } from "@/db/schema/schema"

export default function Questioncard({ question }: { question: Question }) {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const [voteStatus, setVoteStatus] = useState(0)
  const [likeStatus, setLikeStatus] = useState(false)
  const user = useAuth()


  function displayMessage(res: any) {
    if (res.notification) showNotification(res.notification)
    if (res.status == 200) {
      getVoteStatus()
      router.refresh()
    }
  }

  function handleLike() {
    if (!user.isSignedIn) return showNotification(ENoLogon.notification)
    like(question, user.userId).then((res: any) => displayMessage(res))
  }

  function handleVote(number: number) {
    if (!user.isSignedIn) return showNotification(ENoLogon.notification)
    vote(question, user.userId, number).then((res: any) => displayMessage(res))
  }

  function handleDelete() {
    if (!user.isSignedIn) return showNotification(ENoLogon.notification)
    deleteQuestion(question, user.userId).then((res: any) => displayMessage(res))
  }

  function getVoteStatus() {
    if (!user.isSignedIn) return
    if (question.votes1.includes(user.userId)) setVoteStatus(1)
    else if (question.votes2.includes(user.userId)) setVoteStatus(2)
    else setVoteStatus(0)
    if (question.likes.includes(user.userId)) setLikeStatus(true)
    else if (!question.likes.includes(user.userId)) setLikeStatus(false)
  }

  useEffect(() => {
    getVoteStatus()
  })

  return (
    <Card withBorder padding="lg" radius="md" sx={{ margin: "1rem" }}>
      <Modal
        opened={modal}
        onClose={() => setModal(false)}
        title="Are you sure?"
      >
        <Group spacing="xl">
          <Button color="red" onClick={() => setModal(false)}><X />No</Button>
          <Button color="nord_success" onClick={() => {
            handleDelete()
            setModal(false)
          }}><Trash />Yes</Button>
        </Group>
      </Modal>

      <Stack>
        <Group position="apart">
          <Text fw="bold" fz="lg">{question.title}</Text>
          {
            question.posterId === user.userId &&
            <ActionIcon
              onClick={() => setModal(true)}
            ><Trash className="red_icon" /></ActionIcon>
          }
        </Group>
        <Text>{question.desc}</Text>
        <Group spacing="sm">
          <Button id="vote1" className={`${voteStatus == 1 ? "border" : "noBorder"}`} onClick={() => handleVote(1)}>{question.option1}: {question.votes1.length}</Button>
          <Button id="vote2" className={`${voteStatus == 2 ? "border" : "noBorder"}`} onClick={() => handleVote(2)}>{question.option2}: {question.votes2.length}</Button>
        </Group>
        <Group position="right" spacing="xxs">
          <ActionIcon onClick={handleLike}>
            <IconHeartFilled className={`${likeStatus ? "red_icon" : "gray_icon"}`} />
          </ActionIcon>
          <Text>
            {question.likes.length}
          </Text>
        </Group>
      </Stack>
    </Card>
  )
}
