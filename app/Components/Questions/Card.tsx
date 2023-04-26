"use client";

import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { deleteQuestion } from "./logic";
import { Trash, X } from "tabler-icons-react";
import { ENoLogon } from "@/app/api/messages";
import { Question } from "@/db/schema/schema";
import VoteButton from "./(cardComponents)/voteButton";
import LikeButton from "./(cardComponents)/likeButton";
import { boxVariant } from "@/app/framer";
import { useRouter } from "next/navigation";

interface IButtonProps {
  question: Question;
  unmount: () => void;
  index: number;
}

export default function Questioncard(ButtonProps: IButtonProps) {
  const { question, unmount } = ButtonProps;
  const [modal, setModal] = useState(false);
  const [imageByte1, setImage1] = useState<string>("");
  const [imageByte2, setImage2] = useState<string>("");
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  function displayMessage(res: any) {
    if (res.notification) {
      showNotification(res.notification);
      unmount();
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!isSignedIn || !question) {
      return showNotification(ENoLogon.notification);
    }
    deleteQuestion(question, user.id).then((res: any) => displayMessage(res));
  }

  async function getImages() {
    setImage1(`data:image/png;base64,${question.image1?.toString()}` ?? "");
    setImage2(`data:image/png;base64,${question.image2?.toString()}` ?? "");
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        key={ButtonProps.index}
        variants={boxVariant}
        transition={{ duration: .1, delay: ButtonProps.index * .2 }}
      >
        {question &&
          (
            <Card withBorder padding="lg" radius="md" sx={{ margin: "1rem" }}>
              <Modal
                opened={modal}
                onClose={() => setModal(false)}
                title="Are you sure?"
              >
                <Group spacing="xl">
                  <Button color="red" onClick={() => setModal(false)}>
                    <X />No
                  </Button>
                  <Button
                    color="nord_success"
                    onClick={() => {
                      handleDelete();
                      setModal(false);
                    }}
                  >
                    <Trash />Yes
                  </Button>
                </Group>
              </Modal>

              <Stack>
                <Group position="apart">
                  <Text fw="bold" fz="lg">{question.title}</Text>
                  {(isSignedIn &&
                    (question.posterId === user.id)) &&
                    (
                      <ActionIcon
                        onClick={() => setModal(true)}
                      >
                        <Trash className="icon red" />
                      </ActionIcon>
                    )}
                </Group>
                <Text>{question.desc}</Text>
                <VoteButton
                  ButtonProps={{
                    imageByte1: imageByte1,
                    imageByte2: imageByte2,
                    questionid: question.id,
                  }}
                />
                <LikeButton ButtonProps={{ questionid: question.id }} />
              </Stack>
            </Card>
          )}
      </motion.div>
    </AnimatePresence>
  );
}
