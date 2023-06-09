"use client";

import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { ActionIcon, Card, Group, Stack, Switch } from "@mantine/core";
import React, { useState } from "react";
import { boxVariant } from "@/app/framer";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { EditableTextField } from "./(cardComponents)/buttonComponents/editableTextField";
import EditButton from "./(cardComponents)/buttonComponents/editButton";
import ShareIcon from "./(cardComponents)/shareIcon";
import LikeButton from "./(cardComponents)/likeButtonComponents/likeButton";
import { useStyles } from "@/app/styles/styles";
import VoteButton from "./(cardComponents)/voteButton/voteButton";
import { QuestionWithVotesAndLikes } from "@/db/types";
import { displayMessage } from "./helpers";
import { Check, Trash, X } from "tabler-icons-react";

interface IButtonProps {
  question: QuestionWithVotesAndLikes;
  unmount?: () => void;
  index: number;
}

interface updateProps {
  title: string;
  desc: string | null;
  option1: string;
  option2: string;
}

export default function Questioncard(ButtonProps: IButtonProps) {
  const { question } = ButtonProps;
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [deleted, setDeleted] = useState(false);
  const { isSignedIn, user } = useUser();
  const { classes } = useStyles();
  const router = useRouter();

  // const image1 = question.image1 ? question.image1.toString() : ""
  // const image2 = question.image2 ? question.image2.toString() : ""
  // const image3 = question.image3 ? question.image3.toString() : ""
  // const image4 = question.image4 ? question.image4.toString() : ""

  const form = useForm({
    initialValues: {
      title: question.title,
      desc: question.desc,
      // option1: question.option1,
      // option2: question.option2,
    },
  });

  async function editQuestion(values: updateProps, deleted: boolean) {
    if (!user) return;
    await fetch("/api/questions", {
      method: "PATCH",
      body: JSON.stringify({
        ...values,
        id: question.id,
        isDeleted: deleted,
        ownerId: user.id,
      }),
    }).then(async (res) => {
      const r = await res.json();
      if (r.status === 200) {
        displayMessage(r, router, true);
      }
      toggleOpen();
    });
  }

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
            className={classes.outerCardWrapper}
          >
            <form
              className="unstyled-form"
              // onSubmit={form.onSubmit((values) =>
              //   editQuestion(values, deleted)
              // )}
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

                    {isSignedIn && question.ownerId === user.id && (
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
                    setOption3={(value) => {
                      form.setValues((prev) => ({ ...prev, option3: value }));
                    }}
                    setOption4={(value) => {
                      form.setValues((prev) => ({ ...prev, option4: value }));
                    }}
                    isOpen={isOpen}
                    question={question}
                  />
                  {isOpen ? (
                    <Group position="apart">
                      <Switch
                        onLabel={<Trash size="1rem" color="red" />}
                        offLabel={<X size="1rem" color="white" />}
                        onChange={(event) =>
                          setDeleted(event.currentTarget.checked)
                        }
                      />
                      <ActionIcon color="nord_success" type="submit">
                        <Check />
                      </ActionIcon>
                    </Group>
                  ) : (
                    <Group position="apart">
                      <ShareIcon
                        link={`${process.env.HOSTURL}/question/${question.id}`}
                      />
                      <LikeButton ButtonProps={{ question: question }} />
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
