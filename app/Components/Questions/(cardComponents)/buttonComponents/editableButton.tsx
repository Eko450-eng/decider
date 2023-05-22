"use client";
import { useUser } from "@clerk/nextjs";
import { Button, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import {
  useState,
  experimental_useOptimistic as useOptimistic,
  useEffect,
} from "react";
import { displayMessage, noLogin } from "../../helpers";
import { useStyles } from "@/app/styles/styles";
import { getVotes } from "./helpers";
import { IQuestionWithVotes } from "@/prisma/types";

interface IButtonProps {
  question: IQuestionWithVotes;
  option: string;
  index: number;
  isOpen: boolean;
  voteStatus: number;
  setVoteStatus: (index: number) => void;
  setValue: (v: string) => void;
  revalidate: () => void;
}

export function EditableVoteButton(ButtonProps: IButtonProps) {
  const router = useRouter();
  const { classes } = useStyles();
  const { user, isSignedIn } = useUser();
  const [blocked, blockRequest] = useState(false);
  const {
    revalidate,
    setValue,
    question,
    option,
    index,
    isOpen,
    voteStatus,
    setVoteStatus,
  } = ButtonProps;

  const votes: number = getVotes(question, index);

  async function handleVote() {
    blockRequest(true);
    if (!isSignedIn) noLogin(router);
    setVoteStatus(
      voteStatus === 0
        ? index
        : voteStatus !== index && voteStatus !== 1
        ? 2
        : 1
    );
    console.log(voteStatus);
    changeOptimisticVote(
      (optimisticVotes.votes =
        voteStatus === 0
          ? optimisticVotes.votes + 1
          : voteStatus === index
          ? optimisticVotes.votes - 1
          : optimisticVotes.votes - 1)
    );

    await fetch("/api/votes", {
      method: "POST",
      body: JSON.stringify({
        option: index,
        userId: user?.id,
        question: question.id,
      }),
    }).then(async (res: any) => {
      displayMessage(await res.json(), router);
      blockRequest(false);
    });
  }

  const [optimisticVotes, changeOptimisticVote] = useOptimistic(
    { votes, sending: false },
    (state, newVoteCount: number) => ({
      ...state,
      sending: true,
      votes: newVoteCount,
    })
  );

  useEffect(() => {
    if (!optimisticVotes.sending) revalidate();
  }, [optimisticVotes.sending]);

  return (
    <>
      <Button
        className={
          voteStatus === index
            ? classes.buttonSelected
            : classes.buttonUnselected
        }
        suppressContentEditableWarning={true}
        contentEditable={isOpen}
        onInput={(value) => {
          if (!isOpen) return;
          setValue(value.currentTarget.children[0].children[0].innerHTML);
        }}
        onClick={() => {
          if (isOpen || blocked) return;
          handleVote();
        }}
      >
        {option}
        <Text className={classes.voteText}>{optimisticVotes.votes}</Text>
      </Button>
    </>
  );
}
