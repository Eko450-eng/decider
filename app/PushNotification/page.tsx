'use client'
import { Button } from "@mantine/core";
import { Input } from '@mantine/core'
import { useState } from "react";
import { sendPush } from "./messaging";
import { saveMessagingDeviceToken } from "@/public/firebase/messaging";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/userState";
import { Pushdevices } from "@prisma/client";

export default function Push() {
  const user = useSelector((state: RootState) => state.user)
  const [message, setMessage] = useState({
    title: "",
    msg: ""
  })

  async function handleSubscription() {
    saveMessagingDeviceToken(user)
  }

  async function sendMsg() {
    await fetch(`/api/pushDevices?username=${user.username}`, {
      method: "GET"
    })
      .then(async (e: any) => {
        const devices: Pushdevices[] = await e.json()
        console.log("Devices", devices)
        devices.forEach((device: Pushdevices) => {
          sendPush(message.title, message.msg, device.device)
        })
      })
  }

  return (
    <div className="flex-center">
      <Button onClick={() => handleSubscription()}>Enable notification</Button>
      <Input
        onChange={(v) => setMessage({ ...message, title: v.target.value })}
        placeholder="Title"
        value={message.title}
      />

      <Input
        onChange={(v) => setMessage({ ...message, msg: v.target.value })}
        placeholder="Title"
        value={message.msg}
      />
      <Button onClick={() => sendMsg()}>Test notification</Button>
    </div>
  )
}
