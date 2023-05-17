"use client";
import { useUser } from "@clerk/nextjs";
import { Button, Text } from "@mantine/core";
import { vote } from "../../logic";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { ENoLogon } from "@/app/api/messages";
import { Question } from "@/db/schema/schema";
import {
  useEffect,
  useState,
  experimental_useOptimistic as useOptimistic,
} from "react";
import { displayMessage } from "../../helpers";
import { useStyles } from "@/app/styles/styles";

interface IButtonProps {
  question: Question;
  option: string;
  index: number;
  isOpen: boolean;
  setValue: (v: string) => void;
}

export function EditableVoteButton(ButtonProps: IButtonProps) {
  const router = useRouter();
  const { classes } = useStyles();
  const { setValue, question, option, index, isOpen } = ButtonProps;
  const [voteStatus, setVoteStatus] = useState(0);
  const { user, isSignedIn } = useUser();
  const [blocked, blockRequest] = useState(false);

  function validateVotes() {
    if (!isSignedIn || !question) return;
    if (question.votes1.includes(user!.id)) setVoteStatus(1);
    else if (question.votes2.includes(user!.id)) setVoteStatus(2);
    else if (
      question.votes1.includes(user!.id) &&
      question.votes2.includes(user!.id)
    )
      setVoteStatus(0);
  }

  useEffect(() => {
    validateVotes();
  }, [isSignedIn, user]);

  const votes1 = question.votes1.length;
  const votes2 = question.votes2.length;

  function handleVote(number: number) {
    blockRequest(true);
    if (!isSignedIn) {
      router.push("/Signin");
      return showNotification(ENoLogon.notification);
    } else if (index === 1) {
      if (question.votes2.includes(user.id)) return;
      else if (user && question.votes1.includes(user.id)) {
        console.log("1");
        changeOptimisticVote1(optimisticVotes1.votes1 - 1);
        setVoteStatus(0);
      } else if (user && !question.votes1.includes(user.id)) {
        console.log("2");
        setVoteStatus(1);
        changeOptimisticVote1(optimisticVotes1.votes1 + 1);
      }
    } else if (index === 2) {
      if (question.votes1.includes(user.id) || optimisticVotes1.sending) return;
      else if (user && question.votes2.includes(user.id)) {
        setVoteStatus(0);
        changeOptimisticVote2(optimisticVotes2.votes2 - 1);
      } else if (user && !question.votes2.includes(user.id)) {
        setVoteStatus(2);
        changeOptimisticVote2(optimisticVotes2.votes2 + 1);
      }
    }
    vote(question.id, user.id, number).then((res: any) => {
      displayMessage(res, router);
      blockRequest(false);
    });
  }

  const [optimisticVotes1, changeOptimisticVote1] = useOptimistic(
    { votes1, sending: false },
    (state, newVoteCount1: number) => ({
      ...state,
      votes1: newVoteCount1,
      sending: true,
    })
  );

  const [optimisticVotes2, changeOptimisticVote2] = useOptimistic(
    { votes2, sending: false },
    (state, newVoteCount2: number) => ({
      ...state,
      votes2: newVoteCount2,
      sending: true,
    })
  );

  return (
    <>
      <Button
        className={
          voteStatus == index
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
          if (
            isOpen ||
            optimisticVotes1.sending ||
            optimisticVotes2.sending ||
            blocked
          )
            return;
          handleVote(index);
        }}
      >
        {option}
        <Text className={classes.voteText}>
          {index === 1 ? optimisticVotes1.votes1 : optimisticVotes2.votes2}
        </Text>
      </Button>
    </>
  );
}
