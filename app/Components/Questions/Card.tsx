'use client'

import { useUser } from '@clerk/nextjs'
import { Button, Card, Group, Text, Stack, ActionIcon, Modal, MantineProvider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconHeartFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { like, vote, deleteQuestion } from "./logic";
import { Trash, X } from "tabler-icons-react";
import { ENoLogon } from '@/app/api/messages';
import { Question } from "@/db/schema/schema"

export default function Questioncard({ question }: { question: Question }) {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const user = useUser()


  function displayMessage(res: any) {
    showNotification(res.notification)
    if (res.status == 200) router.refresh()
  }

  function handleLike() {
    if (!user.isSignedIn) return showNotification(ENoLogon.notification)
    like(question, user.user.id).then((res: any) => displayMessage(res))
  }

  function handleVote(number: number) {
    if (!user.isSignedIn) return showNotification(ENoLogon.notification)
    vote(question, user.user.id, number).then((res: any) => displayMessage(res))
  }

  function handleDelete() {
    if (!user.isSignedIn) return showNotification(ENoLogon.notification)
    deleteQuestion(question, user.user.id).then((res: any) => displayMessage(res))
  }

  return (
    <MantineProvider
      theme={{
        components: {
          Card: {
            styles: () => ({
              root: {
                width: "fit-content",
                textAlign: "center"
              }
            })
          }
        },
        colorScheme: "dark",
        colors: {
          "nord_pink": ["#CDB2B5", "#C4989D", "#BF7E84", "#BF616A", "#AC575F", "#94555B", "#805257", "#6F4E51", "#61494B", "#554446"],
          "nord_orange": ["#D5B7AE", "#D09F90", "#D08770", "#BD7963", "#AA6C59", "#936556", "#7F5E53", "#6E564F", "#604F4A"],
          "nord_yellow": ["#FBFAF7", "#EFE7D5", "#EAD7B2", "#EBCB8B", "#D9B977", "#C6A769", "#B3975D", "#9E8757", "#887755", "#766A51"],
          "nord_green": ["#DBE1D7", "#C7D1BE", "#B4C6A5", "#A3BE8C", "#93AC7D", "#849B70", "#778967", "#6B7960", "#616A59", "#575E51"],
          "nord_purple": ["#DBD2D9", "#CBBBC8", "#BEA5B9", "#B48EAD", "#A37F9C", "#93728D", "#82697D", "#72616F", "#655963", "#5A5158"],
          "nord_gray": ["#43474F", "#3C404A", "#353A44", "#2E3440", "#2B2F38", "#282B31", "#25272B", "#222327", "#1F2022", "#1C1D1E"],
          "nord_success": ["#548F54", "#458945", "#378437", "#2A812A", "#1C7F1C", "#0E7F0E", "#008000", "#0C680C", "#135513", "#174717",]
        },
        primaryColor: "nord_success",
      }}
      withNormalizeCSS withGlobalStyles
    >
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
              question.posterId === user.user?.id &&
              <ActionIcon
                onClick={() => setModal(true)}
              ><Trash className="red_icon" /></ActionIcon>
            }
          </Group>
          <Text>{question.desc}</Text>
          <Group spacing="sm">
            <Button id="vote1" onClick={() => handleVote(1)}>{question.option1}: {question.votes1.length}</Button>
            <Button id="vote2" onClick={() => handleVote(2)}>{question.option2}: {question.votes2.length}</Button>
          </Group>
          <Group position="right" spacing="xxs">
            <ActionIcon onClick={handleLike}>
              <IconHeartFilled className="red_icon" color="red" />
            </ActionIcon>
            <Text>
              {question.likes.length}
            </Text>
          </Group>
        </Stack>
      </Card>
    </MantineProvider>
  )
}
