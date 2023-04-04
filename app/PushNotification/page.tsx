'use client'
import { Button, Center, Stack, Switch, Text } from "@mantine/core";
import { Input } from '@mantine/core'
import { useState } from "react";
import { saveMessagingDeviceToken } from "@/public/firebase/messaging";
import { useRouter } from "next/navigation";
import { subscribeToTopic, sendMsg, sendMsgToAll } from "./logic";
import { useUser } from "@clerk/nextjs";

export default function Push() {
  const router = useRouter()
  const topicOverview = ["Likes", "Comments", "Votes", "New Questions", "New Features", "System Notifications"]
  const user = useUser()

  const [message, setMessage] = useState({
    title: "",
    msg: ""
  })

  async function handleSubscription() {
    if (!user.user) return
    saveMessagingDeviceToken(user.user.id).then(() => router.refresh())
  }

  async function handleTopic(topic: string, subscribed: boolean) {
    // dispatch(changeSubscritpion({ topic: topic, subscribed: subscribed }))
    // subscribeToTopic(user, topic, subscribed)
  }

  return (
    <div className="flex-center">
      <Center>
        <Button sx={{ margin: "1rem" }} onClick={() => handleSubscription()}>Allow notifications</Button>
      </Center>

      <Text>Get notifications for:</Text>
      {
        // topicOverview.map((topic: string, k: number) => {
        //   return (
        //     <Switch
        //       sx={{ marginBottom: "1rem" }}
        //       key={`notifications${k}`}
        //       label={topic}
        //       checked={subscribed.topics.includes(topic)}
        //       onChange={(e: any) => handleTopic(topic, e.currentTarget.checked)}
        //     />
        //   )
        // })
      }

      {/* Send messages as admin */}
      {/* { */}
      {/* user.role > 8 && */}
      {/* <> */}
      {/*   <Stack spacing="xs"> */}
      {/*     <Input */}
      {/*       onChange={(v) => setMessage({ ...message, title: v.target.value })} */}
      {/*       placeholder="Title" */}
      {/*       value={message.title} */}
      {/*     /> */}

      {/*     <Input */}
      {/*       onChange={(v) => setMessage({ ...message, msg: v.target.value })} */}
      {/*       placeholder="Message" */}
      {/*       value={message.msg} */}
      {/*     /> */}
      {/*   </Stack> */}

      {/*   <Center> */}
      {/*     <Stack sx={{ margin: "1rem" }}> */}
      {/*       <Button onClick={() => sendMsg({ title: message.title, msg: message.msg, user: user })}>Send notification to your devices</Button> */}
      {/*       <Button color="red" onClick={() => sendMsgToAll({ title: message.title, msg: message.msg })}>Send notification to all</Button> */}
      {/*     </Stack> */}
      {/*   </Center> */}
      {/* </> */}
      {/* } */}
    </div>
  )
}
