'use client'

import { useUser } from '@clerk/nextjs'
import { Button, Card, Group, Text, Stack, ActionIcon, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { deleteQuestion } from "./logic";
import { Trash, X } from "tabler-icons-react";
import { ENoLogon } from '@/app/api/messages';
import { Question } from "@/db/schema/schema"
import VoteButton from './(cardComponents)/voteButton';
import LikeButton from './(cardComponents)/likeButton';

export default function Questioncard({ question }: { question: Question }) {
  const [modal, setModal] = useState(false)
  const [imageByte1, setImage1] = useState<string>("")
  const [imageByte2, setImage2] = useState<string>("")
  const { isSignedIn, user } = useUser()
  const role = user ? user.publicMetadata.role as number : 0

  function displayMessage(res: any) { if (res.notification) showNotification(res.notification) }

  async function handleDelete() {
    if (!isSignedIn || !question) return showNotification(ENoLogon.notification)
    if (role > 8) {
      await fetch("/api/questions/force", {
        method: "PATCH",
        body: JSON.stringify({
          questionid: question.id,
          role: role
        })
      })
    } else {
      deleteQuestion(question, user.id).then((res: any) => displayMessage(res))
    }
  }

  async function getImages() {
    setImage1(`data:image/png;base64,${question.image1?.toString()}` ?? "")
    setImage2(`data:image/png;base64,${question.image2?.toString()}` ?? "")
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <>
      {question &&
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
                (isSignedIn && (question.posterId === user.id || role > 8)) &&
                <ActionIcon
                  onClick={() => setModal(true)}
                ><Trash className="icon red" /></ActionIcon>
              }
            </Group>
            <Text>{question.desc}</Text>
            <VoteButton ButtonProps={{ imageByte1: imageByte1, imageByte2: imageByte2, questionid: question.id }} />
            <LikeButton ButtonProps={{ questionid: question.id }} />
          </Stack>
        </Card>
      }
    </>
  )
}
