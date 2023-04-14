'use client'

import { Button, FileInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/navigation"
import { PleaseLogin } from "../(PleaseLogin)"
import { useAuth, useUser } from "@clerk/nextjs"
import imageCompression from 'browser-image-compression'
import { useState } from "react"

interface ImageState {
  image1: string | undefined | null
  image2: string | undefined | null
}

export default function Page() {
  const router = useRouter()
  const user = useUser()
  const auth = useAuth()
  const { userId } = auth
  const [images, setImages] = useState<ImageState>({
    image1: "",
    image2: ""
  })

  const form = useForm({
    initialValues: {
      title: "",
      desc: "",
      option1: "",
      option2: "",
    }
  })

  async function createQuestion(question: { title: string, desc: string, option1: string, option2: string }) {
    if (!user.isSignedIn) showNotification({ title: "Whoops", message: "Please login to create a question", color: "red" })
    await fetch('/api/questions/createQuestion', {
      method: "POST",
      body: JSON.stringify({
        ...question,
        image1: images.image1,
        image2: images.image2,
        userId: userId
      })
    }).then(async (e: any) => {
      const returnValue = await e.json()

      showNotification(returnValue.notification)
      if (returnValue.status === 200) {
        router.push("/")
        router.refresh()
      }
    })
  }

  async function convertToBlob(file: File | null): Promise<ArrayBuffer | null> {
    if (!file) return null
    const options = {
      maxSizeMB: 3,
      maxWidthOrHeight: 1920
    }

    const compressedFile = await imageCompression(file, options);

    return compressedFile.arrayBuffer()
  }

  async function saveImage(option: 1 | 2, image: File | null) {
    if (!image) return

    const res = await convertToBlob(image)

    process.nextTick(() => {

      if (!res) return
      try {
        const base64String = btoa(new Uint8Array(res).reduce(function(data, byte) {
          return data + String.fromCharCode(byte);
        }, ''));

        process.nextTick(() => {
          if (option === 1) {
            setImages({ ...images, image1: base64String })
          } else {
            setImages({ ...images, image2: base64String })
          }
        })
      } catch (e: any) {
        console.trace()
        console.log()
        showNotification({ title: "Well uhhh", message: "Seems like that image is tooo big", color: "red" })
      }
    })
  }

  return (
    <>
      {
        user.isSignedIn ?
          <form onSubmit={form.onSubmit((values) => createQuestion(values))}>
            <TextInput
              label="Title"
              placeholder="this or that?"
              {...form.getInputProps("title")}
            />
            <TextInput
              label="Description"
              placeholder="Should I do this or that?"
              {...form.getInputProps("desc")}
            />

            <TextInput
              label="Option One"
              placeholder="this?"
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
              {...form.getInputProps("option2")}
            />

            <FileInput
              placeholder="Image 1"
              label="Image for first option"
              accept="image/png,image/jpeg"
              onChange={(v) => saveImage(2, v)}
            />

            <Button type="submit">Create</Button>
          </form>
          :
          <PleaseLogin />
      }
    </>
  )
}

