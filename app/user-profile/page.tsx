'use client'
import { RedirectToSignIn, SignedIn, SignedOut, UserProfile, useAuth } from "@clerk/nextjs";
import Push from "../PushNotification/page";
import { ActionIcon, Center, Group, Tooltip } from "@mantine/core";
import { Logout } from "tabler-icons-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()
  const user = useAuth()
  return (
    <>
      <SignedIn>
        <Center>
          <Group>
            <Push />
            <Tooltip label="Log out">
              <ActionIcon onClick={() => {
                router.push("/")
                router.refresh()
                setTimeout(() => {
                  user.signOut()
                }, 250)
              }} ><Logout /> </ActionIcon>
            </Tooltip>
          </Group>
        </Center>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
