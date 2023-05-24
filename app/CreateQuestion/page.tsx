"use client";

import { Button, FileInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { PleaseLogin } from "../(PleaseLogin)";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { convertToBase64 } from "./helpers";
import { Check } from "tabler-icons-react";
import { displayMessage } from "../Components/Questions/helpers";
import { showNotification } from "@mantine/notifications";
import { Question } from "@/db/types";

export interface ImageState {
  image1: string | undefined | null;
  image2: string | undefined | null;
}

export default function Page() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const [images, setImages] = useState<ImageState>({
    image1: "",
    image2: "",
  });

  const form = useForm({
    initialValues: {
      title: "",
      desc: "",
      option1: "",
      option2: "",
    },
  });

  async function handleCreation(
    values: Omit<
      Question,
      "image1" | "image2" | "id" | "createdAt" | "ownerId" | "isDeleted"
    >
  ) {
    if (!user) return;
    await fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        image1: images.image1 ?? null,
        image2: images.image2 ?? null,
        isDeleted: false,
        ownerId: user.id,
      }),
    }).then(async(res) => {
      const r = await res.json()
      if (r.status === 200) {
        displayMessage(r, router, true);
      }
    });
  }

  async function saveImage(option: 1 | 2, image: File | null) {
    if (!image) return;

    try {
      const base64String = await convertToBase64(image);

      if (option === 1) {
        setImages({ ...images, image1: base64String });
      } else {
        setImages({ ...images, image2: base64String });
      }
    } catch (e: any) {
      showNotification({
        title: "Well uhhh",
        message: "Seems like that image is too big",
        color: "red",
      });
    }
  }

  return (
    <>
      {isSignedIn ? (
        <form
          className="creation-form"
          onSubmit={form.onSubmit((values) => handleCreation(values))}
        >
          <TextInput
            label="Title"
            placeholder="this or that?"
            sx={{
              input: {
                color: `${
                  form.getInputProps("title").value.length > 100
                    ? "red"
                    : "white"
                }`,
              },
            }}
            error={`${
              form.getInputProps("title").value.length > 100 ? "red" : "white"
            }`}
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Description"
            placeholder="Should I do this or that?"
            sx={{
              input: {
                color: `${
                  form.getInputProps("desc").value.length > 100
                    ? "red"
                    : "white"
                }`,
              },
            }}
            {...form.getInputProps("desc")}
          />

          <TextInput
            label="Option One"
            placeholder="this?"
            sx={{
              input: {
                color: `${
                  form.getInputProps("option1").value.length > 30
                    ? "red"
                    : "white"
                }`,
              },
            }}
            {...form.getInputProps("option1")}
          />
          <FileInput
            placeholder="Image 1"
            label="Image for first option"
            accept="image/png,image/jpeg"
            onChange={(v) => saveImage(1, v)}
          />

          <TextInput
            label="Option Two"
            placeholder="that?"
            sx={{
              input: {
                color: `${
                  form.getInputProps("option2").value.length > 30
                    ? "red"
                    : "white"
                }`,
              },
            }}
            {...form.getInputProps("option2")}
          />

          <FileInput
            placeholder="Image 1"
            label="Image for first option"
            accept="image/png,image/jpeg"
            onChange={(v) => saveImage(2, v)}
          />

          <Button type="submit" rightIcon={<Check />}>
            Create
          </Button>
        </form>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
}
