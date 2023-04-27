"use client";
import { Text, TextInput } from "@mantine/core";

interface IButtonProps {
  title: string;
  isOpen: boolean;
  form: any;
  weight?: "normal" | "bold" | "bolder" | "light" | "lighter";
  fz?: "sm" | "xs" | "md" | "lg" | "xl";
  rightSection?: any;
}

export function EditableTextField(ButtonProps: IButtonProps) {
  const { title, isOpen, form, weight, fz, rightSection } = ButtonProps;

  return (
    <>
      {isOpen ? (
        <TextInput
          placeholder={title}
          {...form.getInputProps(title)}
          rightSection={rightSection ?? null}
        />
      ) : (
        <Text fw={weight ?? "normal"} fz={fz ?? "md"}>
          {title}
        </Text>
      )}
    </>
  );
}
