"use client";
import { Text } from "@mantine/core";

interface IButtonProps {
  title: string;
  isOpen: boolean;
  setValue: (v: string)=>void;
  weight?: "normal" | "bold" | "bolder" | "light" | "lighter";
}

export function EditableTextField(ButtonProps: IButtonProps) {
  const { title, isOpen, setValue, weight } = ButtonProps;

  return (
    <Text
      suppressContentEditableWarning={true}
      contentEditable={isOpen}
      onInput={(value)=> setValue(value.currentTarget.innerHTML)}
      fw={weight ?? "normal"}
      sx={{
        textAlign: "center",
        width: "100%",
        marginTop: ".5rem",
        overflowWrap: "break-word",
      }}
    >
    {title}
    </Text>
  );
}
