"use client";
import { useUser } from "@clerk/nextjs";
import { Button, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { EAlreadyVoted } from "@/app/api/messages";
import {
  useState,
  experimental_useOptimistic as useOptimistic,
  useEffect,
} from "react";
import { displayMessage, noLogin } from "../../helpers";
import { useStyles } from "@/app/styles/styles";
import { getVotes } from "./helpers";
import { IQuestionWithVotes } from "@/prisma/types";
import { voteApi, removeVote } from "../voteButton/apis";

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

  function voting(voted: boolean) {
    if (!user) return;
    if (!voted) {
      changeOptimisticVote(optimisticVotes.votes + 1);
      setVoteStatus(index);
      voteApi({
        option: index,
        question: question.id,
        userid: user!.id,
      }).then((res: any) => {
        displayMessage(res, router);
        blockRequest(false);
      });
    } else if (voted) {
      changeOptimisticVote(optimisticVotes.votes - 1);
      setVoteStatus(0);
      removeVote({
        option: index,
        question: question.id,
        userid: user!.id,
      }).then((res: any) => {
        displayMessage(res, router);
        blockRequest(false);
      });
    }
  }

  function handleVote() {
    blockRequest(true);
    // Check if user is logged in
    if (!isSignedIn) noLogin(router);
    // Check if the user has not already voted for something
    else if (voteStatus === 0) voting(false);
    else if (voteStatus === index) voting(true);
    else showNotification(EAlreadyVoted.notification);
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
