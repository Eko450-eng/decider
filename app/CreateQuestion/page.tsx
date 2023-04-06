'use client'

import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/navigation"
import { PleaseLogin } from "../(PleaseLogin)"
import { useAuth, useUser } from "@clerk/nextjs"

export default function Page() {
  const router = useRouter()
  const user = useUser()
  const auth = useAuth()
  const { userId } = auth

  const form = useForm({
    initialValues: {
      title: "",
      desc: "",
      option1: "",
      option2: ""
    }
  })

  async function createQuestion(question: { title: string, desc: string, option1: string, option2: string }) {
    if (!user.isSignedIn) showNotification({ title: "Whoops", message: "Please login to create a question", color: "red" })
    await fetch('/api/questions/createQuestion', {
      method: "POST",
      body: JSON.stringify({
        ...question,
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

            <TextInput
              label="Option Two"
              placeholder="that?"
              {...form.getInputProps("option2")}
            />
            <Button type="submit">Create</Button>
          </form>
          :
          <PleaseLogin />
      }
    </>
  )
}

