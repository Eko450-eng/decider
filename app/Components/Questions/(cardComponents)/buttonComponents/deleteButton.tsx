<<<<<<< HEAD
import { ActionIcon, Group } from "@mantine/core";
import { Check, Trash, X } from "tabler-icons-react";
=======
import { ActionIcon, Button, Group } from "@mantine/core";
import { Check, Trash } from "tabler-icons-react";
>>>>>>> main

interface IButtonProps {
  isOpen: boolean;
  handleDelete: () => void;
  toggleOpen: () => void;
}

export default function DeleteButton(ButtonProps: IButtonProps) {
  const { isOpen, toggleOpen, handleDelete } = ButtonProps;
  return (
    <>
      {isOpen && (
        <Group position="apart">
<<<<<<< HEAD
          <Group>
=======
>>>>>>> main
          <ActionIcon
            color="red"
            onClick={() => {
              handleDelete();
              toggleOpen();
            }}
          >
            <Trash />
          </ActionIcon>
<<<<<<< HEAD
          <ActionIcon onClick={() => toggleOpen()}>
            <X />
          </ActionIcon>
        </Group>
          <ActionIcon color="nord_success" type="submit">
=======
          <ActionIcon
            color="nord_success"
            type="submit"
          >
>>>>>>> main
            <Check />
          </ActionIcon>
        </Group>
      )}
    </>
  );
}
