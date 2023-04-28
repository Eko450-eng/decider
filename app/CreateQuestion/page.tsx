"use client";

import { Button, FileInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { PleaseLogin } from "../(PleaseLogin)";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { convertToBase64, createQuestion } from "./logic";
import { Check } from "tabler-icons-react";

export interface ImageState {
  image1: string | undefined | null;
  image2: string | undefined | null;
}

export default function Page() {
  const router = useRouter();
  const user = useUser();

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
        message: "Seems like that image is tooo big",
        color: "red",
      });
    }
  }

  return (
    <>
      {user.isSignedIn
        ? (
          <form
            className="creation-form"
            onSubmit={form.onSubmit((values) =>
              createQuestion({ user: user, question: values, images: images })
                .then((res) => {
                  if (res === 200) {
                    router.push("/");
                    router.refresh();
                  }
                })
            )}
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

            <Button type="submit"
              rightIcon={<Check />}
            >Create</Button>
          </form>
        )
        : <PleaseLogin />}
    </>
  );
}
