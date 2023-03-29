
export async function sendPush(title: string, message: string, key: string) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `${process.env.NEXT_PUBLIC_AUTHORIZATIONKEY}`
  }

  const body = {
    "to": key,
    "notification": {
      "title": title,
      "body": message
    }
  }

  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
}

export async function sendNewVote(vote: string, message: string, key: string) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `${process.env.NEXT_PUBLIC_AUTHORIZATIONKEY}`
  }

  const body = {
    "to": key,
    "notification": {
      "title": `There has been a new vote on ${vote}`,
      "body": message
    }
  }

  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })

}
