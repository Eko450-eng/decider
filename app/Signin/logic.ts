
import { Profile } from '@prisma/client'


export async function getUsers(username: string) {
  const returnValue = await fetch(`/api/users?username=${username}`, {
    method: "GET"
  }).then(async (e: any) => {
    const res = await e.json()
    return await res
  })
  return returnValue
}

export async function loginUser(user: { username: string, password: string }) {
  const { password, username } = user
  const data = {
    password: password,
    username: username
  }

  const returnValue = await fetch(`/api/getusers`, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(async (e: any) => {
    const returnValue = await e.json()
    if (e.status !== 200) return returnValue
    localStorage.setItem("token", returnValue.token)

    return returnValue
  })
  return returnValue
}
