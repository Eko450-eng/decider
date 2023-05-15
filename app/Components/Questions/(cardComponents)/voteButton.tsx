"use client";
import { Question } from "@/db/schema/schema";
import { useUser } from "@clerk/nextjs";
import { Center, Modal, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { EditableVoteButton } from "./buttonComponents/editableButton";
import Image from "next/image";

interface IButtonProps {
  setOption1: (values: string) => void;
  setOption2: (values: string) => void;
  isOpen: boolean;
  imageByte1: string;
  imageByte2: string;
  questionid: number;
}

export default function VoteButton({
  ButtonProps,
}: {
  ButtonProps: IButtonProps;
}) {
  const { questionid, imageByte2, imageByte1, isOpen, setOption1, setOption2 } =
    ButtonProps;
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
          alt="Fullscreen option Image"
          width={500}
          height={500}
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
            {!isOpen && imageByte1 !== "data:image/png;base64," && (
              <Center>
                <img
                  alt="First Option Image"
                  onClick={() => setImageModal(imageByte1)}
                  src={`${imageByte1}`}
                  style={{ maxWidth: "5rem", maxHeight: "5rem" }}
                  width={500}
                  height={500}
                />
              </Center>
            )}
            <EditableVoteButton
              setValue={setOption1}
              isOpen={isOpen}
              voteStatus={voteStatus}
              votes={question.votes1}
              questionid={questionid}
              getQuestion={() => getQuestion()}
              option={question.option1}
              index={1}
            />
          </Stack>
          <Stack>
            {!isOpen && imageByte2 !== "data:image/png;base64," && (
              <Center>
                <img
                  alt="Second Option Image"
                  onClick={() => setImageModal(imageByte2)}
                  src={`${imageByte2}`}
                  style={{ maxWidth: "5rem", maxHeight: "5rem" }}
                  width={500}
                  height={500}
                />
              </Center>
            )}
            <EditableVoteButton
              setValue={setOption2}
              isOpen={isOpen}
              voteStatus={voteStatus}
              votes={question.votes2}
              questionid={questionid}
              getQuestion={() => getQuestion()}
              option={question.option2}
              index={2}
            />
          </Stack>
        </Stack>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
