"use client";

import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Card, Group, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { deleteQuestion, editQuestion } from "./logic";
import { ENoLogon } from "@/app/api/messages";
import { Question } from "@/db/schema/schema";
import VoteButton from "./(cardComponents)/voteButton";
import LikeButton from "./(cardComponents)/likeButton";
import { boxVariant } from "@/app/framer";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import DeleteButton from "./(cardComponents)/buttonComponents/deleteButton";
import { EditableTextField } from "./(cardComponents)/buttonComponents/editableTextField";
import EditButton from "./(cardComponents)/buttonComponents/editButton";
import ShareIcon from "./(cardComponents)/shareIcon";

interface IButtonProps {
  question: Question;
  unmount: () => void;
  index: number;
}

export default function Questioncard(ButtonProps: IButtonProps) {
  const { question, unmount } = ButtonProps;
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [imageByte1, setImage1] = useState<string>("");
  const [imageByte2, setImage2] = useState<string>("");
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  function displayMessage(res: any) {
    if (res.notification) {
      showNotification(res.notification);
      unmount();
      if (isOpen) toggleOpen();
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!isSignedIn || !question) {
      return showNotification(ENoLogon.notification);
    }
    deleteQuestion(question, user.id).then((res: any) => displayMessage(res));
  }

  async function changeQuestion(values: {
    title: string;
    desc: string | null;
    option1: string;
    option2: string;
  }) {
    if (!isSignedIn) return;
    const d = { ...values, id: question.id, userid: user.id };
    editQuestion(d).then((res: any) => displayMessage(res));
  }

  async function getImages() {
    setImage1(`data:image/png;base64,${question.image1?.toString()}` ?? "");
    setImage2(`data:image/png;base64,${question.image2?.toString()}` ?? "");
  }

  useEffect(() => {
    console.log();
    getImages();
  }, []);

  const form = useForm({
    initialValues: {
      title: question.title,
      desc: question.desc,
      option1: question.option1,
      option2: question.option2,
    },
  });

  return (
    <AnimatePresence>
      <motion.div
        className="cards"
        exit={{ opacity: 0 }}
        key={ButtonProps.index}
        variants={boxVariant}
        transition={{ duration: 0.1, delay: ButtonProps.index * 0.2 }}
      >
        {question && (
          <Card
            withBorder
            padding="lg"
            radius="md"
            className={isOpen ? "card-closed" : "card-closed"}
          >
            <form
              className="unstyled-form"
              onSubmit={form.onSubmit((values) => changeQuestion(values))}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "space-between",
                  height: "100%",
                }}
              >
                <Stack>
                  <Group
                    sx={{
                      width: "100%",
                      overflowWrap: "break-word",
                    }}
                    position="apart"
                  >
                    <EditableTextField
                      title={question.title}
                      setValue={(value)=>{form.setValues((prev)=>({...prev, title: value}))}}
                      isOpen={isOpen}
                      weight="bold"
                    />

                    {isSignedIn && question.posterId === user.id && (
                      <EditButton toggleOpen={toggleOpen} isOpen={isOpen} />
                    )}
                  </Group>

                  <EditableTextField
                    title={question.desc ?? ""}
                      setValue={(value)=>{form.setValues((prev)=>({...prev, desc: value}))}}
                    isOpen={isOpen}
                  />
                </Stack>
                <Stack>
                  <VoteButton
                    ButtonProps={{
                      /* setOption1={form.setValues((prev)=>({...prev, option1: value}))} */
                      setOption1:(value)=>{form.setValues((prev)=>({...prev, option1: value}))},
                      setOption2:(value)=>{form.setValues((prev)=>({...prev, option2: value}))},
                      isOpen: isOpen,
                      imageByte1: imageByte1,
                      imageByte2: imageByte2,
                      questionid: question.id,
                    }}
                  />
                  {isOpen ? (
                    <DeleteButton
                      isOpen={isOpen}
                      handleDelete={handleDelete}
                      toggleOpen={toggleOpen}
                    />
                  ) : (
                    <Group position="apart">
                      <ShareIcon
                        link={`https://wipdesign.eu/question/${question.id}`}
                      />
                      <LikeButton ButtonProps={{ questionid: question.id }} />
                    </Group>
                  )}
                </Stack>
              </Stack>
            </form>
          </Card>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
