'use client'
import { login } from '@/redux/reducers/user'
import bcrypt from 'bcryptjs-react'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Profile } from '@prisma/client'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/navigation'

export default function Page() {
  const dispatch = useDispatch()
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()
  const regex = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
  ]

  const form = useForm({
    initialValues: {
      email: "",
      role: 0,
      password: "",
      username: ""
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      username: (value) => value.length >= 3 ? null : "Username must be at least 3 characters long",
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 Characters long" :
          !value.match(/[A-Z]/) ? 'Password must contain at least 1 uppercase letter' :
            !value.match(/[a-z]/) ? 'Password must contain at least 1 lowercase letter' :
              !value.match(/[0-9]/) ? 'Password must contain at least 1 number' :
                !value.match(/[$&+,:;=?@#|'<>.^*()%!-]/) ? 'Password must contain at least 1 special character' :
                  value !== confirmPassword ? 'Please confirm your password' : null
    }
  })

  async function getUsers() {
    await fetch(`/api/users?username=Eko`, {
      method: "GET"
    }).then(async (e: any) => {
      const res = await e.json()
      dispatch(login(res))
    })
  }

  async function createUser(user: Profile) {
    const { role, email, password, username } = user
    const salt = bcrypt.genSaltSync(12)
    const hashedPass = bcrypt.hashSync(password, salt)
    const data = {
      email: email,
      role: role,
      password: hashedPass,
      username: username
    }

    await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(async (e: Response) => {
      const res = (await e.json())
      showNotification(res)
      if (res.status === 200) router.push("/Signin")
    })

  }

  return (
    <div>
      <Button onClick={getUsers}>Get users</Button>
      <form onSubmit={form.onSubmit((values) => createUser(values as Profile))}>
        <TextInput
          label="Email"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Username"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="Confirmpassword"
          value={confirmPassword}
          onChange={(v: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(v.target.value)}
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  )
}
