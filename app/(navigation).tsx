'use client'

import Image from 'next/image'
import { ActionIcon, Affix, Center, Group, Modal } from "@mantine/core"
import { IconUser } from "@tabler/icons-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Home, Login, Plus, UserPlus } from 'tabler-icons-react'
import Push from "./PushNotification/page"
import { useAuth, useUser } from "@clerk/nextjs"

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
  const user = useAuth()
  const userImage = useUser()

  const [image, setImage] = useState("")
  const [modalSettings, setModalSettings] = useState(false)

  useEffect(() => {
    if (!userImage.isSignedIn) return
    setImage(userImage.user.profileImageUrl)
  }, [userImage])

  return (
    <>
      <Modal
        opened={modalSettings}
        onClose={() => setModalSettings(false)}
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
                  <LinkButton link="/user-profile" icon={
                    image == "" ?
                      <IconUser /> :
                      <Image
                        className="avatar"
                        src={image}
                        alt="No image"
                        width="30"
                        height="30"
                      />
                  } />
                </>
            }
          </Group>
        </Center>
      </Affix>
    </>
  )
}
