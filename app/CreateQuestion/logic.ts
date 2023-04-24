import { UserResource } from '@clerk/types';
import { showNotification } from '@mantine/notifications';
import imageCompression from 'browser-image-compression'
import { ImageState } from './page';

export async function compressImage(file: File | null): Promise<ArrayBuffer | null> {
  if (!file) return null

  const options = {
    maxSizeMB: 3,
    maxWidthOrHeight: 1920
  }

  const compressedFile = await imageCompression(file, options);

  return compressedFile.arrayBuffer()
}

export async function convertToBase64(file: File) {
  const image = await compressImage(file)

  if (!image) return
  const res = btoa(new Uint8Array(image).reduce(function(data, byte) {
    return data + String.fromCharCode(byte);
  }, ''));

  return res
}

interface QuestionProps {
  question: {
    title: string,
    desc: string,
    option1: string,
    option2: string
  },
  user: {
    isSignedIn: boolean,
    isLoaded: boolean,
    user: UserResource
  },
  images: ImageState
}


export async function createQuestion(props: QuestionProps) {
  const { user, question, images } = props

  if (!user.isSignedIn) showNotification({ title: "Whoops", message: "Please login to create a question", color: "red" })
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTING_SERVER}/questions`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({
      ...question,
      image1: images.image1,
      image2: images.image2,
      userId: user.user.id
    })
  }).then(async (e: any) => {
    const returnValue = await e.json()

    showNotification(returnValue.notification)
    return returnValue.status
  })
  return res
}
