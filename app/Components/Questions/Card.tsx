'use client'

import { useUser } from '@clerk/nextjs'
import { Button, Card, Group, Text, Stack, ActionIcon, Modal, Center } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconHeartFilled } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { like, vote, deleteQuestion } from "./logic";
import { Trash, X } from "tabler-icons-react";
import { ENoLogon } from '@/app/api/messages';
import { Question } from "@/db/schema/schema"

export default function Questioncard({ questionId }: { questionId: string | number }) {
  const [question, setData] = useState<null | Question>(null)

  async function getQuestion() {
    if (!questionId) return
    await fetch(`/api/question?id=${questionId}`, { method: "GET", cache: "no-store" })
      .then(async (res) => {
        const d = await res.json()
        setData(d)
      })
  }

  useEffect(() => {
    getQuestion()
  }, [])

  const [modal, setModal] = useState(false)
  const [imageModal, setImageModal] = useState("")
  const [voteStatus, setVoteStatus] = useState(0)
  const [likeStatus, setLikeStatus] = useState(false)
  const [imageByte1, setImage1] = useState<string>("")
  const [imageByte2, setImage2] = useState<string>("")
  const { isSignedIn, user } = useUser()

  const role = user ? user.publicMetadata.role as number : 0

  function displayMessage(res: any) {
    if (res.notification) showNotification(res.notification)
    if (res.status == 200) {
      getVoteStatus()
      getQuestion()
    }
  }

  function handleLike() {
    if (!isSignedIn || !question) return showNotification(ENoLogon.notification)
    like(question, user.id).then((res: any) => displayMessage(res))
  }

  function handleVote(number: number) {
    if (!isSignedIn || !question) return showNotification(ENoLogon.notification)
    vote(question, user.id, number).then((res: any) => displayMessage(res))
  }

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

  function getVoteStatus() {
    if (!isSignedIn || !question) return
    if (question.votes1.includes(user.id)) setVoteStatus(1)
    else if (question.votes2.includes(user.id)) setVoteStatus(2)
    else setVoteStatus(0)
    if (question.likes.includes(user.id)) setLikeStatus(true)
    else if (!question.likes.includes(user.id)) setLikeStatus(false)
  }

  async function getImages() {
    if (!question) return
    const images: string[] = []
    if (question.image1) {
      const imageSrc1 = `data:image/png;base64,${question.image1?.toString()}`
      setImage1(imageSrc1)
    }
    if (question.image2) {
      const imageSrc2 = `data:image/png;base64,${question.image2?.toString()}`
      setImage2(imageSrc2)
    }
    return images
  }

  useEffect(() => {
    getImages()
    getVoteStatus()
  })

  return (<>
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

        <Modal
          onClose={() => setImageModal("")}
          opened={imageModal !== ""}
          fullScreen
        >
          <img src={`${imageModal}`} style={{
            maxWidth: "100%",
            maxHeight: "100%",
            zIndex: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
            onClick={() => setImageModal("")}
          />
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
          <Stack spacing="sm">
            <Stack >
              {imageByte1 !== "" &&
                <Center>
                  <img onClick={() => setImageModal(imageByte1)} src={`${imageByte1}`} style={{ maxWidth: "5rem", maxHeight: "5rem" }} />
                </Center>
              }
              <Button id="vote1" className={`${voteStatus == 1 ? "border" : "noBorder"}`} onClick={() => handleVote(1)}>{question.option1}: {question.votes1.length}</Button>
            </Stack>
            <Stack>
              {imageByte2 !== "" &&
                <Center>
                  <img onClick={() => setImageModal(imageByte2)} src={`${imageByte2}`} style={{ maxWidth: "5rem", maxHeight: "5rem" }} />
                </Center>
              }
              <Button id="vote2" className={`${voteStatus == 2 ? "border" : "noBorder"}`} onClick={() => handleVote(2)}>{question.option2}: {question.votes2.length}</Button>
            </Stack>
          </Stack>
          <Group position="right" spacing="xxs">
            <ActionIcon onClick={handleLike}>
              <IconHeartFilled className={`${likeStatus ? "icon red" : "icon"}`} />
            </ActionIcon>
            <Text>
              {question.likes.length}
            </Text>
          </Group>
        </Stack>
      </Card>
    }
  </>
  )
}
