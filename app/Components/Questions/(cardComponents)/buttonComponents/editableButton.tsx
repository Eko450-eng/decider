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

interface IButtonProps {
  question: QuestionWithVotes;
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
  const { user, isSignedIn, isLoaded } = useUser();
  const [blocked, blockRequest] = useState(false);
  const { setValue, question, option, index, isOpen } = ButtonProps;
  const [votes, setVotes] = useState<number>(getVoteCount(question, index));
  const [voteStatus, _setVoteStatus] = useState<boolean>(false);

  function validateVotes() {
    if (!isSignedIn || !question) return;
    question.votes.map((vote: QuestionVotes) => {
      if (vote.ownerId === user.id && vote.option === index) {
        changeOptimisticVoteStatus(true);
      } else {
        changeOptimisticVoteStatus(false);
      }
    });
    if (question.votes.length <= 0) changeOptimisticVoteStatus(false);
  }

  async function handleVote() {
    blockRequest(true);
    if (!isSignedIn) noLogin(router);

    changeOptimisticVote(
      (optimisticVotes.votes = voteStatus
        ? optimisticVotes.votes + 1
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

  const [optimisticVoteStatus, changeOptimisticVoteStatus] = useOptimistic(
    { status: voteStatus },
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
        className={
          optimisticVoteStatus.status
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
