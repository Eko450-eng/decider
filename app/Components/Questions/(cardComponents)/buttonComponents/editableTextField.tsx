"use client";
import { Text, TextInput } from "@mantine/core";

interface IButtonProps {
  title: string;
  isOpen: boolean;
  form: any;
  weight?: "normal" | "bold" | "bolder" | "light" | "lighter";
  fz?: "sm" | "xs" | "md" | "lg" | "xl";
}

export function EditableTextField(ButtonProps: IButtonProps) {
  const { title, isOpen, form, weight, fz } = ButtonProps;

  return (
    <>
      {isOpen ? (
        <TextInput placeholder={title} {...form.getInputProps(title)} />
      ) : (
          <Text fw={weight ?? "normal"} fz={fz ?? "md"} >
            {title}
          </Text>
      )}
    </>
  );
}
