import { UserResource } from "@clerk/types";
import { showNotification } from "@mantine/notifications";
import imageCompression from "browser-image-compression";
import { ImageState } from "./page";
import { createQuestionApi } from "./apis";
import { question } from "@prisma/client";

export async function compressImage(
  file: File | null
): Promise<ArrayBuffer | null> {
  if (!file) return null;

  const options = {
    maxSizeMB: 3,
    maxWidthOrHeight: 1920,
  };

  const compressedFile = await imageCompression(file, options);

  return compressedFile.arrayBuffer();
}

export async function convertToBase64(file: File) {
  const image = await compressImage(file);

  if (!image) return;
  const res = btoa(
    new Uint8Array(image).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, "")
  );

  return res;
}

interface QuestionProps {
  question: question;
  user: {
    isSignedIn: boolean;
    isLoaded: boolean;
    user: UserResource;
  };
  images: ImageState;
}

export async function createQuestion(props: QuestionProps) {
  const { user } = props;

  if (!user.isSignedIn) {
    showNotification({
      title: "Whoops",
      message: "Please login to create a question",
      color: "red",
    });
  }

  const res = createQuestionApi({
    question: props.question,
    userid: user.user.id,
    images: props.images,
  });
  return res;
}
