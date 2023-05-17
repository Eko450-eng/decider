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
    if (!isSignedIn) {
      router.push("/Signin");
      return showNotification(ENoLogon.notification);
    } else if (index === 1) {
      if (question.votes2.includes(user.id)) return;
      else if (user && question.votes1.includes(user.id)) {
        changeOptimisticVote(optimisticVotes.votes1 - 1);
        setVoteStatus(0);
      } else if (user && !question.votes1.includes(user.id)) {
        setVoteStatus(1);
        changeOptimisticVote(optimisticVotes.votes1 + 1);
      }
    } else if (index === 2) {
      if (question.votes1.includes(user.id)) return;
      else if (user && question.votes2.includes(user.id)) {
        setVoteStatus(0);
        changeOptimisticVote(optimisticVotes.votes2 - 1);
      } else if (user && !question.votes2.includes(user.id)) {
        setVoteStatus(2);
        changeOptimisticVote(optimisticVotes.votes2 + 1);
      }
    }
    vote(question.id, user.id, number).then((res: any) => {
      displayMessage(res, router);
    });
  }

  const [optimisticVotes, changeOptimisticVote] = useOptimistic(
    { votes1, votes2 },
    (state, newVoteCount1: number) => ({
      ...state,
      votes1: newVoteCount1,
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
          if (isOpen) return;
          handleVote(index);
        }}
      >
        {option}
        <Text className={classes.voteText}>
          {index === 1 ? optimisticVotes.votes1 : optimisticVotes.votes2}
        </Text>
      </Button>
    </>
  );
}
