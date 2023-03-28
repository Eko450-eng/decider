'use client'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Profile } from '@prisma/client'
import { getUsers, loginUser } from './logic'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/reducers/user'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch()

  const form = useForm({
    initialValues: {
      password: "",
      username: ""
    }
  })

  async function handleLogin(values: Profile) {
    await loginUser(values).then((returnValue: any) => {
      if (returnValue.status === 400) {
        showNotification(returnValue)
      } else {
        showNotification(returnValue.notifications)
        getUsers(values.username).then((res: any) => {
          dispatch(login(res))
        })
        setTimeout(() => router.push("/"), 250)
      }
    })
  }

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleLogin(values as Profile))}>
        <TextInput
          label="Username"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          {...form.getInputProps("password")}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
