import { UserState } from "@/redux/reducers/user"
import { Pushdevices } from "@prisma/client"
import { sendPush } from "./messaging"

export async function sendMsgToAll({ title, msg }: { title: string, msg: string }) {
  await fetch(`/api/pushAllDevices`, {
    method: "GET"
  })
    .then(async (e: any) => {
      const devices: Pushdevices[] = await e.json()
      devices.forEach((device: Pushdevices) => {
        sendPush(title, msg, device.device)
      })
    })
}

export async function sendMsg({ title, msg, user }: { title: string, msg: string, user: UserState }) {
  await fetch(`/api/pushDevices?username=${user.username}`, {
    method: "GET"
  })
    .then(async (e: any) => {
      const devices: Pushdevices[] = await e.json()
      devices.forEach((device: Pushdevices) => {
        sendPush(title, msg, device.device)
      })
    })
}

export async function saveSubscription({ topic, user }: { topic: string, user: UserState }) {
  let token: string[] = []

  await fetch(`/api/pushDevices?username=${user.username}`, {
    method: "GET"
  })
    .then(async (e: any) => {
      const devices: Pushdevices[] = await e.json()
      devices.forEach((device: Pushdevices) => {
        token.push(device.device)
      })

      await fetch('/api/subscription', {
        method: "POST",
        body: JSON.stringify({
          token: token,
          topic: topic,
          user: user
        })
      })
    })
}
