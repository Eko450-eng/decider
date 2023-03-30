'use client'
import { Button, Center, Group, Stack } from "@mantine/core";
import { Input } from '@mantine/core'
import { useState } from "react";
import { sendPush } from "./messaging";
import { saveMessagingDeviceToken } from "@/public/firebase/messaging";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/userState";
import { Pushdevices } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function Push() {
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const [message, setMessage] = useState({
    title: "",
    msg: ""
  })

  async function handleSubscription() {
    saveMessagingDeviceToken(user)
      .then(() => router.refresh())
  }

  async function sendMsgToAll() {
    await fetch(`/api/pushAllDevices`, {
      method: "GET"
    })
      .then(async (e: any) => {
        const devices: Pushdevices[] = await e.json()
        devices.forEach((device: Pushdevices) => {
          sendPush(message.title, message.msg, device.device)
        })
      })
  }

  async function sendMsg() {
    await fetch(`/api/pushDevices?username=${user.username}`, {
      method: "GET"
    })
      .then(async (e: any) => {
        const devices: Pushdevices[] = await e.json()
        devices.forEach((device: Pushdevices) => {
          sendPush(message.title, message.msg, device.device)
        })
      })
  }

  return (
    <div className="flex-center">
      <Center>
        <Button sx={{ margin: "1rem" }} onClick={() => handleSubscription()}>Enable notification</Button>
      </Center>
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
              <Button onClick={() => sendMsg()}>Send notification to your devices</Button>
              <Button color="red" onClick={() => sendMsgToAll()}>Send notification to all</Button>
            </Stack>
          </Center>
        </>
      }
    </div>
  )
}
