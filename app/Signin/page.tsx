'use client'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Profile } from '@prisma/client'
import { getUsers, loginUser } from './logic'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/reducers/user'

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch()

  const form = useForm({
    initialValues: {
      password: "",
      username: ""
    }
  })

  async function handleLogin(values: { username: string, password: string }) {
    await loginUser(values)
      .then((res: any) => {
        if (res.status === 200) {
          showNotification(res.notification)
          getUsers(values.username).then((res: Profile) => {
            dispatch(login(res))
          }).then(() => router.push("/"))
        } else {
          showNotification(res.notification)
        }
      })
  }

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
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
