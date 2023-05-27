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
  image3: Blob | undefined | null;
  image4: Blob | undefined | null;
}

export default function Page() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const [images, setImages] = useState<ImageState>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const premium = true

  const form = useForm({
    initialValues: {
      title: "",
      desc: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
    validate: {
      title: (value) =>
        value.replaceAll(" ", "").length >= 2 ? null : "Please enter a title",
      option1: (value) =>
        value.replaceAll(" ", "").length >= 2
          ? null
          : "Please enter a first option",
      option2: (value) =>
        value.replaceAll(" ", "").length >= 2
          ? null
          : "Please enter a second option",
    },
  });

  async function handleCreation(
    values: Omit<
      Question,
      "image1" | "image2" | "image3" | "image4" | "id" | "createdAt" | "ownerId" | "isDeleted"
    >
  ) {
    if (!user) return;
    const option1Name = (values.option1 + values.title).replaceAll(
      "[^a-zA-Z0-9]+",
      ""
    );
    const option2Name = (values.option2 + values.title).replaceAll(
      "[^a-zA-Z0-9]+",
      ""
    );
    const option3Name = (values.option3 + values.title).replaceAll(
      "[^a-zA-Z0-9]+",
      ""
    );
    const option4Name = (values.option4 + values.title).replaceAll(
      "[^a-zA-Z0-9]+",
      ""
    );

    await fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        image1: images.image1 ? option1Name : null,
        image2: images.image2 ? option2Name : null,
        image3: images.image2 ? option3Name : null,
        image4: images.image2 ? option4Name : null,
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
    const storageRef1 = ref(storage, option1Name);
    const storageRef2 = ref(storage, option2Name);
    const storageRef3 = ref(storage, option3Name);
    const storageRef4 = ref(storage, option4Name);
    if (images.image1) uploadBytes(storageRef1, images.image1 as Blob);
    if (images.image2) uploadBytes(storageRef2, images.image2 as Blob);
    if (images.image3) uploadBytes(storageRef3, images.image3 as Blob);
    if (images.image4) uploadBytes(storageRef4, images.image4 as Blob);
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

          {premium && (
            <>
              <TextInput
                label="Option Three"
                placeholder="How'd you get three options?"
                sx={{
                  input: {
                    color: `${
                      form.getInputProps("option3").value.length > 30
                        ? "red"
                        : "white"
                    }`,
                  },
                }}
                {...form.getInputProps("option3")}
              />

              <FileInput
                placeholder="Image 3"
                label="Image for third option"
                accept="image/png,image/jpeg"
                onChange={(v) =>
                  setImages((prev: ImageState) => {
                    return { ...prev, image3: v };
                  })
                }
              />

              <TextInput
                label="Option Four"
                placeholder="Wait whaaat?"
                sx={{
                  input: {
                    color: `${
                      form.getInputProps("option4").value.length > 30
                        ? "red"
                        : "white"
                    }`,
                  },
                }}
                {...form.getInputProps("option4")}
              />

              <FileInput
                placeholder="Image 4"
                label="Image for fourth option"
                accept="image/png,image/jpeg"
                onChange={(v) =>
                  setImages((prev: ImageState) => {
                    return { ...prev, image4: v };
                  })
                }
              />
            </>
          )}
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
