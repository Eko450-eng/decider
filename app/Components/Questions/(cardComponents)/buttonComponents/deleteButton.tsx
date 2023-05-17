import { ActionIcon, Group } from "@mantine/core";
import { Check, Trash, X } from "tabler-icons-react";

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
          <Group>
          <ActionIcon
            color="red"
            onClick={() => {
              handleDelete();
              toggleOpen();
            }}
          >
            <Trash />
          </ActionIcon>
          <ActionIcon onClick={() => toggleOpen()}>
            <X />
          </ActionIcon>
        </Group>
          <ActionIcon color="nord_success" type="submit">
            <Check />
          </ActionIcon>
        </Group>
      )}
    </>
  );
}
