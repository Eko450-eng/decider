import { Profile } from "@prisma/client"

export type NotificationResult = {
  status: number,
  notification: {
    title: string
    message: string
    color: string
  }
}

export type UserNotificationResult = {

  status: number
  user: Profile
  token: string
  notifications: {
    title: string
    message: string
    color: string
  }
}
