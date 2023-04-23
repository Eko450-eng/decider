
import { showNotification } from '@mantine/notifications'
import { deleteToken, getToken, onMessage } from 'firebase/messaging'
import { messaging } from './config'
import { SERVER } from '@/app/vars'

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPIDKEY

export async function requestPushPermission(userId: string) {
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
    await saveMessagingDeviceToken(userId)
  }
}

export async function saveMessagingDeviceToken(userId: string) {
  const msg = await messaging()
  if (!msg) return
  const token = await getToken(msg, { vapidKey: VAPID_KEY })

  if (token) {
    await fetch(`${SERVER}/users/pushDevices`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        "device": token,
        "userId": userId,
      })
    })

    onMessage(msg, (message) => {
      if (!message.notification || !message.notification.title || !message.notification.body) return

      showNotification({
        title: message.notification.title,
        message: message.notification.body
      })
    })

  } else {
    requestPushPermission(userId)
  }
  return token
}

export async function resendToken() {
  const msg = await messaging()
  if (!msg) return
  const token = await getToken(msg)
  return token
}

export async function deleteThisToken() {
  const msg = await messaging()
  if (!msg) return
  await deleteToken(msg)
}
