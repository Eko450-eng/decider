"use client";

import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Card, Group, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Question } from "@/db/schema/schema";
import { boxVariant } from "@/app/framer";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import DeleteButton from "./(cardComponents)/buttonComponents/deleteButton";
import { EditableTextField } from "./(cardComponents)/buttonComponents/editableTextField";
import EditButton from "./(cardComponents)/buttonComponents/editButton";
import ShareIcon from "./(cardComponents)/shareIcon";
import { changeQuestion, handleDelete } from "./handlers";
import VoteButton from "./(cardComponents)/voteButton/voteButton";
import LikeButton from "./(cardComponents)/likeButtonComponents/likeButton";
import { useStyles } from "@/app/styles/styles";

interface IButtonProps {
  question: Question;
  unmount?: () => void;
  index: number;
}

export default function Questioncard(ButtonProps: IButtonProps) {
  const { question } = ButtonProps;
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [imageByte1, setImage1] = useState<string>("");
  const [imageByte2, setImage2] = useState<string>("");
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const props = { router: router, user: user, isSignedIn: isSignedIn };

  async function getImages() {
    setImage1(
      `${
        question.image1
          ? `data:image/png;base64,${question.image1.toString()}`
          : ""
      }`
    );
    setImage2(
      `${
        question.image2
          ? `data:image/png;base64,${question.image2.toString()}`
          : ""
      }`
    );
    // setImage2(`data:image/png;base64,${question.image2?.toString()}` ?? "");
  }

  useEffect(() => {
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

  const { classes } = useStyles();

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
          <Card withBorder padding="lg" radius="md" className="card-closed">
            <form
              className="unstyled-form"
              onSubmit={form.onSubmit((values) =>
                changeQuestion(question, values, props)
              )}
            >
              <Stack className={classes.innerCardWrapper}>
                <Stack>
                  <Group className={classes.title} position="apart">
                    <EditableTextField
                      title={question.title}
                      setValue={(value) => {
                        form.setValues((prev) => ({ ...prev, title: value }));
                      }}
                      isOpen={isOpen}
                      weight="bold"
                    />

                    {isSignedIn && question.posterId === user.id && (
                      <EditButton toggleOpen={toggleOpen} isOpen={isOpen} />
                    )}
                  </Group>

                  <EditableTextField
                    title={question.desc ?? ""}
                    setValue={(value) => {
                      form.setValues((prev) => ({ ...prev, desc: value }));
                    }}
                    isOpen={isOpen}
                  />
                </Stack>
                <Stack>
                  <VoteButton
                    setOption1={(value) => {
                      form.setValues((prev) => ({ ...prev, option1: value }));
                    }}
                    setOption2={(value) => {
                      form.setValues((prev) => ({ ...prev, option2: value }));
                    }}
                    isOpen={isOpen}
                    imageByte1={imageByte1}
                    imageByte2={imageByte2}
                    question={question}
                  />
                  {isOpen ? (
                    <Group>
                      <DeleteButton
                        isOpen={isOpen}
                        handleDelete={() => handleDelete(props, question)}
                        toggleOpen={toggleOpen}
                      />
                    </Group>
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
