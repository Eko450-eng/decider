"use client";

import { Button, FileInput, TextInput } from "@mantine/core";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { PleaseLogin } from "../(PleaseLogin)";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Check } from "tabler-icons-react";
import { displayMessage } from "../Components/Questions/helpers";
import { Question } from "@/db/types";

export interface ImageState {
  image1: Blob | undefined | null;
  image2: Blob | undefined | null;
}

export default function Page() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const [images, setImages] = useState<ImageState>({
    image1: null,
    image2: null,
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
    }).then(async (res) => {
      const r = await res.json();
      if (r.status === 200) {
        displayMessage(r, router, true);
      }
    });

    const storage = getStorage();
    const storageRef = ref(storage, "");

    uploadBytes(storageRef, images.image1 as Blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    uploadBytes(storageRef, images.image2 as Blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
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
            onChange={(v) =>
              setImages((prev: ImageState) => {
                return { ...prev, image1: v };
              })
            }
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
            placeholder="Image 2"
            label="Image for first option"
            accept="image/png,image/jpeg"
            onChange={(v) =>
              setImages((prev: ImageState) => {
                return { ...prev, image2: v };
              })
            }
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
