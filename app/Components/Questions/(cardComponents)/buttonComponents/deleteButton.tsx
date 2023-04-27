import { Button, Group } from "@mantine/core";
import { Check, Trash } from "tabler-icons-react";

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
        <Group position="center">
          <Button
            color="red"
            onClick={() => {
              handleDelete();
              toggleOpen();
            }}
            leftIcon={<Trash />}
          >
            Delete
          </Button>
          <Button color="nord_success" type="submit" rightIcon={<Check />}>
            Change
          </Button>
        </Group>
      )}
    </>
  );
}
