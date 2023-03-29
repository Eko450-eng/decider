
import { showNotification } from '@mantine/notifications'
import { deleteToken, getToken, onMessage } from 'firebase/messaging'
import { messaging } from './config'
import { UserState } from '@/redux/reducers/user'

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPIDKEY

export async function requestPushPermission(user: UserState) {
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
    await saveMessagingDeviceToken(user)
  }
}

export async function saveMessagingDeviceToken(user: UserState) {
  const msg = await messaging()
  if (!msg) return
  const token = await getToken(msg, { vapidKey: VAPID_KEY })

  console.log("Got token", token)

  if (token) {
    await fetch("/api/pushDevices", {
      method: "POST",
      body: JSON.stringify({
        "device": token,
        "userID": user.id,
        "username": user.username
      })
    })
      .then(() => console.log("Success"))
    onMessage(msg, (message) => {
      if (!message.notification || !message.notification.title || !message.notification.body) return

      console.log("HERE")
      showNotification({
        title: message.notification.title,
        message: message.notification.body
      })
    })

  } else {
    requestPushPermission(user)
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
  console.log("deleting")
  await deleteToken(msg)
}
