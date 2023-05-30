"use client";
import { Button, Text } from "@mantine/core";
import { useStyles } from "@/app/styles/styles";
import { Option } from "@/db/types";

interface IButtonProps {
  option: Option;
  isOpen: boolean;
  voted: boolean;
  voteCount: number;
  handleVote: () => void;
}

export function EditableVoteButton(ButtonProps: IButtonProps) {
  const { classes } = useStyles();
  const { voteCount, handleVote, option, voted, isOpen } = ButtonProps;

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
        <Text className={classes.voteText}>{voteCount}</Text>
      </Button>
    </>
  );
}
