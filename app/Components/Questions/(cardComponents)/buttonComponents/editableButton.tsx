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
import { getVoteCount } from "./helpers";
import { QuestionVotes, QuestionWithVotes } from "@/db/types";
import { voteNumber } from "../voteButton/voteButton";

interface IButtonProps {
  question: QuestionWithVotes;
  option: string;
  index: voteNumber;
  isOpen: boolean;
  voteStatus: voteNumber;
  setVoteStatus: (index: voteNumber) => void;
  setValue: (v: string) => void;
  revalidate: () => void;
}

export function EditableVoteButton(ButtonProps: IButtonProps) {
  const router = useRouter();
  const { classes } = useStyles();
  const { setValue, question, option, index, isOpen } = ButtonProps;
  const { user, isSignedIn, isLoaded } = useUser();

  const [blockedRequest, setBlockRequest] = useState(false);
  const [votes, setVotes] = useState<number>(getVoteCount(question, index));
  const [isVoted, _setIsVoted] = useState<boolean>(false);

  function validateVotes() {
    if (!isSignedIn || !question) return;
    question.votes.map((vote: QuestionVotes) => {
      if (vote.ownerId === user.id && vote.option === index) {
        console.log(index)
        changeOptimisticVoteStatus(true);
      } else {
        changeOptimisticVoteStatus(false);
      }
    });
    if (question.votes.length <= 0) changeOptimisticVoteStatus(false);
  }

  async function handleVote() {
    setBlockRequest(true);
    if (!isSignedIn) return noLogin(router);

    // ToDo: Figure out a fix for this
    changeOptimisticVote(
      (optimisticVotes.votes = isVoted
        ? optimisticVotes.votes + 1
        : optimisticVotes.votes - 1)
    );

    await fetch("/api/votes", {
      method: "POST",
      body: JSON.stringify({
        option: index,
        userId: user.id,
        question: question.id,
      }),
    }).then(async (res: any) => {
      displayMessage(await res.json(), router);
      setBlockRequest(false);
    });
  }

  const [optimisticVoteStatus, changeOptimisticVoteStatus] = useOptimistic(
    { status: isVoted },
    (state, newState: boolean) => ({
      ...state,
      status: newState,
    })
  );

  const [optimisticVotes, changeOptimisticVote] = useOptimistic(
    { votes },
    (state, newVoteCount: number) => ({
      ...state,
      votes: newVoteCount,
    })
  );

  useEffect(() => {
    setVotes(getVoteCount(question, index));
    validateVotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, isLoaded]);

  return (
    <>
      <Button
        suppressContentEditableWarning={true}
        contentEditable={isOpen}
        onInput={(value) => {
          if (!isOpen) return;
          setValue(value.currentTarget.children[0].children[0].innerHTML);
        }}

        className={
          optimisticVoteStatus.status
            ? classes.buttonSelected
            : classes.buttonUnselected
        }

        onClick={() => {
          if (isOpen || blockedRequest) return;
          handleVote();
        }}
      >
        {option}
        <Text className={classes.voteText}>{optimisticVotes.votes}</Text>
      </Button>
    </>
  );
}
