"use client";
import { Button } from "@mantine/core";
import { useStyles } from "@/app/styles/styles";
import { Option, QuestionWithVotes } from "@/db/types";

interface IButtonProps {
  question: QuestionWithVotes;
  option: Option;
  isOpen: boolean;
  voteCount: number;
  voted: boolean;
  handleVote: () => void;
}

export function EditableVoteButton(ButtonProps: IButtonProps) {
  const { classes } = useStyles();
  const { handleVote, option, voted, isOpen } = ButtonProps;

  return (
    <>
      <Button
        suppressContentEditableWarning={true}
        contentEditable={isOpen}
        onInput={(_value) => {
          if (!isOpen) return;
          // setValue(value.currentTarget.children[0].children[0].innerHTML);
        }}
        className={voted ? classes.buttonSelected : classes.buttonUnselected}
        onClick={() => {
          if (isOpen) return;
          handleVote();
        }}
      >
        {option.name}
        {/* ToDo:Removed for now */}
        {/* <Text className={classes.voteText}>{voteCount}</Text> */}
      </Button>
    </>
  );
}
