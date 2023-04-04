
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
  user: any
  token: string
  notifications: {
    title: string
    message: string
    color: string
  }
}
