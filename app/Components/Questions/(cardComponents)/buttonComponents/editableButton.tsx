"use client";
import { useUser } from "@clerk/nextjs";
import { Button, Text } from "@mantine/core";
import { vote } from "../../logic";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { ENoLogon } from "@/app/api/messages";

interface IButtonProps {
  voteStatus: number;
  votes: string[];
  questionid: number;
  getQuestion: () => void;
  option: string;
  index: number;
  isOpen: boolean;
  setValue: (v: string) => void;
}

export function EditableVoteButton(ButtonProps: IButtonProps) {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const {
    voteStatus,
    setValue,
    getQuestion,
    questionid,
    option,
    index,
    isOpen,
    votes,
  } = ButtonProps;

  function displayMessage(res: any) {
    if (res.notification) showNotification(res.notification);
    getQuestion();
  }

  function handleVote(number: number) {
    if (!isSignedIn) {
      router.push("/Signin");
      return showNotification(ENoLogon.notification);
    }
    vote(questionid, user.id, number).then((res: any) => displayMessage(res));
  }

  return (
    <>
      <Button
        className={`${voteStatus == index ? "border" : "noBorder"}`}
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
        sx={(theme) => ({
          backgroundColor: `${
            voteStatus === 0
              ? "indigo"
              : voteStatus === index
              ? theme.colors.nord_success[8]
              : theme.colors.nord_gray[2]
          }`,
        })}
      >
        {option}
        {voteStatus !== 0 && (
          <Text
            sx={{
              position: "absolute",
              bottom: "0",
              right: ".5rem",
            }}
          >
            {votes.length}
          </Text>
        )}
      </Button>
    </>
  );
}
