"use client";
import { ENoLogon } from "@/app/api/messages";
import { Question } from "@/db/schema/schema";
import { useUser } from "@clerk/nextjs";
import { Button, Center, Modal, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { EditableVoteButton } from "./editableButton";

interface IButtonProps {
  form:any
  isOpen: boolean
  imageByte1: string;
  imageByte2: string;
  questionid: number;
}

export default function VoteButton({
  ButtonProps,
}: {
  ButtonProps: IButtonProps;
}) {
  const { questionid, imageByte2, imageByte1, isOpen, form } = ButtonProps;
  const { isSignedIn, user } = useUser();

  const [question, setQuestion] = useState<Question>();
  const [imageModal, setImageModal] = useState("");
  const [voteStatus, setVoteStatus] = useState(0);


  async function getQuestion() {
    await fetch(
      `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/votes?id=${questionid}`,
      { method: "GET", cache: "no-store" }
    ).then(async (res: any) => {
      const q = await res.json();
      setQuestion(q[0]);
    });
  }

  async function getVoteStatus() {
    if (!isSignedIn || !question) return;
    if (question.votes1.includes(user.id)) setVoteStatus(1);
    else if (question.votes2.includes(user.id)) setVoteStatus(2);
    else setVoteStatus(0);
  }

  useEffect(() => {
    getQuestion();
  }, [isSignedIn]);

  useEffect(() => {
    getVoteStatus();
  }, [question]);

  return (
    <>
      <Modal
        onClose={() => setImageModal("")}
        opened={imageModal !== ""}
        fullScreen
      >
        <img
          src={`${imageModal}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            zIndex: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => setImageModal("")}
        />
      </Modal>

      {question ? (
        <Stack spacing="sm">
          <Stack>
            {imageByte1 !== "data:image/png;base64," && (
              <Center>
                <img
                  onClick={() => setImageModal(imageByte1)}
                  src={`${imageByte1}`}
                  style={{ maxWidth: "5rem", maxHeight: "5rem" }}
                />
              </Center>
            )}
            <EditableVoteButton form={form} isOpen={isOpen} voteStatus={voteStatus} votes={question.votes1} questionid={questionid} getQuestion={()=>getQuestion()} option={question.option1} index={1} />
          </Stack>
          <Stack>
            {imageByte2 !== "data:image/png;base64," && (
              <Center>
                <img
                  onClick={() => setImageModal(imageByte2)}
                  src={`${imageByte2}`}
                  style={{ maxWidth: "5rem", maxHeight: "5rem" }}
                />
              </Center>
            )}
            <EditableVoteButton form={form} isOpen={isOpen} voteStatus={voteStatus} votes={question.votes2} questionid={questionid} getQuestion={()=>getQuestion()} option={question.option2} index={2} />
          </Stack>
        </Stack>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
