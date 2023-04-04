'use client'

import { ActionIcon, Affix, Center, Group, Modal } from "@mantine/core"
import { IconSettingsFilled } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Home, Login, Logout, Plus, Reload, UserPlus } from 'tabler-icons-react'
import Push from "./PushNotification/page"
import { useAuth } from "@clerk/nextjs"

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
  const router = useRouter()
  const user = useAuth()

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
              !user.isSignedIn ?
                <>
                  <LinkButton link="/Signup" icon={<UserPlus />} />
                  <LinkButton link="/Signin" icon={<Login />} />
                </>
                :
                <>
                  <LinkButton link="/CreateQuestion" icon={<Plus />} />
                  <ActionIcon onClick={() => user.signOut()} ><Logout /></ActionIcon>
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
