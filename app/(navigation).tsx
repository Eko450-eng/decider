'use client'

import { logout } from "@/redux/reducers/user"
import { RootState } from "@/redux/userState"
import { ActionIcon, Affix, Button, Center, Group, Stack } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Home, Login, Logout, Plus, UserPlus } from 'tabler-icons-react'

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
  const dispatch = useDispatch()

  function signOut() {
    localStorage.removeItem("token")
    dispatch(logout())
    router.push("/Signup")
  }
  const user = useSelector((state: RootState) => state.user)

  return (
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
              </>
          }
        </Group>
      </Center>
    </Affix>
  )
}
