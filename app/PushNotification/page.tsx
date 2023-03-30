'use client'
import { Button, Center, Stack, Switch } from "@mantine/core";
import { Input } from '@mantine/core'
import { useState } from "react";
import { saveMessagingDeviceToken } from "@/public/firebase/messaging";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/userState";
import { useRouter } from "next/navigation";
import { saveSubscription, sendMsg, sendMsgToAll } from "./logic";
import { messaging } from "@/public/firebase/config";
import { getMessaging } from "firebase/messaging";

interface ISubscriptions {
  name: string
  state: boolean
}

export default function Push() {
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState<ISubscriptions[]>([
    { name: "likes", state: false },
    { name: "comments", state: false },
    { name: "votes", state: false },
    { name: "newQuestions", state: false },
    { name: "newFeatures", state: false },
    { name: "generallNotification", state: false },
    { name: "systemUpdates", state: false }
  ])
  const [message, setMessage] = useState({
    title: "",
    msg: ""
  })

  async function handleSubscription() {
    saveMessagingDeviceToken(user).then(() => router.refresh())
  }

  async function handleTopic() {

    subscriptions.forEach(topic => {
      if (topic.state) saveSubscription({ user: user, topic: topic.name })
    })
  }

  return (
    <div className="flex-center">
      <Center>
        <Button sx={{ margin: "1rem" }} onClick={() => handleSubscription()}>Enable notification</Button>
      </Center>

      {
        subscriptions.map((v: any, k: number) => {
          return (
            <Switch
              sx={{ marginBottom: "1rem" }}
              key={`notifications${k}`}
              label={v.name}
              checked={v.state}
              onChange={(e: any) => {
                const newSub = [{ name: v.name, state: e.currentTarget.checked }]
                const newSubscriptions = subscriptions.map(sub => newSub.find(o => o.name === sub.name) || sub)
                setSubscriptions(newSubscriptions)
              }}
            />
          )
        })
      }
      <Button onClick={handleTopic}>Save</Button>


      {/* Send messages as admin */}
      {
        user.role > 8 &&
        <>
          <Stack spacing="xs">
            <Input
              onChange={(v) => setMessage({ ...message, title: v.target.value })}
              placeholder="Title"
              value={message.title}
            />

            <Input
              onChange={(v) => setMessage({ ...message, msg: v.target.value })}
              placeholder="Message"
              value={message.msg}
            />
          </Stack>

          <Center>
            <Stack sx={{ margin: "1rem" }}>
              <Button onClick={() => sendMsg({ title: message.title, msg: message.msg, user: user })}>Send notification to your devices</Button>
              <Button color="red" onClick={() => sendMsgToAll({ title: message.title, msg: message.msg })}>Send notification to all</Button>
            </Stack>
          </Center>
        </>
      }
    </div>
  )
}
