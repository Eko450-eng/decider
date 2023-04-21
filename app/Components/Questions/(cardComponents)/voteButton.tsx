'use client'
import { ENoLogon } from "@/app/api/messages";
import { Question } from "@/db/schema/schema";
import { useUser } from "@clerk/nextjs";
import { Button, Center, Modal, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { vote } from "../logic";

interface IButtonProps {
  imageByte1: string
  imageByte2: string
  questionid: number
}

export default function VoteButton({ ButtonProps }: { ButtonProps: IButtonProps }) {
  const { questionid, imageByte2, imageByte1 } = ButtonProps
  const { isSignedIn, user, isLoaded } = useUser()

  const [question, setQuestion] = useState<Question>()
  const [imageModal, setImageModal] = useState("")
  const [voteStatus, setVoteStatus] = useState(0)


  async function getQuestion() {
    await fetch(`/api/vote?id=${questionid}`, { method: "GET", cache: "no-store" })
      .then(async (res: any) => {
        setQuestion(await res.json())
      })
  }


  async function getVoteStatus() {
    if (!isSignedIn || !question) return
    if (question.votes1.includes(user.id)) setVoteStatus(1)
    else if (question.votes2.includes(user.id)) setVoteStatus(2)
    else setVoteStatus(0)
  }

  function displayMessage(res: any) {
    if (res.notification) showNotification(res.notification)
    getQuestion()
  }

  function handleVote(number: number) {
    if (!isSignedIn || !question) return showNotification(ENoLogon.notification)
    vote(questionid, user.id, number).then((res: any) => displayMessage(res))
  }

  useEffect(() => {
    getQuestion()
  }, [isSignedIn])

  useEffect(() => {
    getVoteStatus()
  }, [question])

  return (
    <>
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

      {
        question ?
          <Stack spacing="sm">
            <Stack >
              {imageByte1 !== "data:image/png;base64," &&
                <Center>
                  <img onClick={() => setImageModal(imageByte1)} src={`${imageByte1}`} style={{ maxWidth: "5rem", maxHeight: "5rem" }} />
                </Center>
              }
              <Button id="vote1" className={`${voteStatus == 1 ? "border" : "noBorder"}`} onClick={() => handleVote(1)}>{question.option1}: {question.votes1.length}</Button>
            </Stack>
            <Stack>
              {imageByte2 !== "data:image/png;base64," &&
                <Center>
                  <img onClick={() => setImageModal(imageByte2)} src={`${imageByte2}`} style={{ maxWidth: "5rem", maxHeight: "5rem" }} />
                </Center>
              }
              <Button id="vote2" className={`${voteStatus == 2 ? "border" : "noBorder"}`} onClick={() => handleVote(2)}>{question.option2}: {question.votes2.length}</Button>
            </Stack>
          </Stack>
          :
          <p>Loading</p>
      }
    </>
  )

}
