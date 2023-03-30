'use client'

import { loginWithToken, logout } from "@/redux/reducers/user"
import { RootState } from "@/redux/userState"
import { ActionIcon, Affix, Center, Group, Modal } from "@mantine/core"
import { IconSettingsFilled } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Home, Login, Logout, Plus, Reload, UserPlus } from 'tabler-icons-react'
import Push from "./PushNotification/page"

function LinkButton({ link, icon }: { link: any, icon: any }) {
  return (
    <Link href={link}>
      <ActionIcon>
        {icon}
      </ActionIcon>
    </Link>
  )
}



export default function Navigation() {
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem("token")) return
    const token = localStorage.getItem("token")
    if (!token) return
    dispatch(loginWithToken(token))
  }, [])

  function signOut() {
    localStorage.removeItem("token")
    dispatch(logout())
    router.push("/Signup")
  }

  async function revalidationHandler() {
    await fetch(`/api/revalidate?token=${process.env.NEXT_PUBLIC_SECRETKEY}`)
      .then(() => router.refresh())
  }
  const [modal, setModal] = useState(false)

  return (
    <>
      <Modal
        opened={modal}
        onClose={() => setModal(false)}
        title="Settings"
      >
        <Push />
      </Modal>
      <Affix position={{ left: 0, bottom: 0 }} sx={theme => ({ padding: "1rem", width: "100%", background: theme.colors.gray })}>
        <Center>
          <Group>
            <LinkButton link="/" icon={<Home />} />
            {
              !user.id ?
                <>
                  <LinkButton link="/Signup" icon={<UserPlus />} />
                  <LinkButton link="/Signin" icon={<Login />} />
                </>
                :
                <>
                  <LinkButton link="/CreateQuestion" icon={<Plus />} />
                  <ActionIcon onClick={() => signOut()} ><Logout /></ActionIcon>
                  <ActionIcon onClick={() => setModal(true)}><IconSettingsFilled /></ActionIcon>
                  <ActionIcon onClick={() => revalidationHandler()} ><Reload /></ActionIcon>
                </>
            }
          </Group>
        </Center>
      </Affix>
    </>
  )
}
