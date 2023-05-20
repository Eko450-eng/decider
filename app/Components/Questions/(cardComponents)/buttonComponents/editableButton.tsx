"use client";
import { useUser } from "@clerk/nextjs";
import { Button, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { EAlreadyVoted, ENoLogon } from "@/app/api/messages";
import {
  useState,
  experimental_useOptimistic as useOptimistic,
  useEffect,
} from "react";
import { displayMessage, noLogin } from "../../helpers";
import { useStyles } from "@/app/styles/styles";
import { removeVote, voteApi } from "@/app/CreateQuestion/apis";
import { IQuestionWithVotes } from "../voteButton/voteButton";
import { UserResource } from "@clerk/types";

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
  const { user, isSignedIn } = useUser();
  const [blocked, blockRequest] = useState(false);

  function getVotes(): number {
    const ret: String[] = [];
    question.votes.map((ev) => {
      if (ev.option === index) ret.push(ev.ownerId);
    });
    return ret.length;
  }

  const votes: number = getVotes();

  function voting(voted: boolean) {
    if (!user) return;
    if (!voted) {
      changeOptimisticVote(optimisticVotes.votes + 1);
      voteApi({
        option: index,
        question: question.id,
        userid: user!.id,
      }).then((res: any) => {
        displayMessage(res, router);
      });
    } else if (voted) {
      changeOptimisticVote(optimisticVotes.votes - 1);
      removeVote({
        option: index,
        question: question.id,
        userid: user!.id,
      }).then((res: any) => {
        displayMessage(res, router);
      });
    }
    blockRequest(false);
  }

  function handleVote() {
    blockRequest(true);
    // Check if user is logged in
    if (!isSignedIn) noLogin(router)
    // Check if the user has not already voted for something
    else if (voteStatus === 0) voting(false);
    else if (voteStatus === index) voting(true);
    else showNotification(EAlreadyVoted.notification);
    setVoteStatus(index);
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
    console.log(voteStatus, optimisticVotes.sending)
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
