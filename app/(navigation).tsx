"use client";

import Image from "next/image";
import { Affix, Center, Modal, Tabs } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Home, Login, Plus, UserPlus } from "tabler-icons-react";
import Push from "./PushNotification/page";
import { useAuth, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function LinkButton({ link, icon }: { link: any; icon: any }) {
  return (
    <Link href={link}>
      <Tabs.Tab value={link}>
        {icon}
      </Tabs.Tab> </Link>
  );
}

export default function Navigation() {
  const user = useAuth();
  const userImage = useUser();

  const router = useRouter();

  const [image, setImage] = useState("");
  const [modalSettings, setModalSettings] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (!userImage.isSignedIn) return;
    setImage(userImage.user.profileImageUrl);
  }, [userImage]);

  return (
    <>
      <Modal
        opened={modalSettings}
        onClose={() => setModalSettings(false)}
        title="Settings"
      >
        <Push />
      </Modal>

      <Affix
        position={{ left: 0, bottom: 0 }}
        sx={(theme) => ({
          padding: ".3rem",
          width: "100%",
          background: theme.colors.gray,
        })}
      >
        <Center>
          <Tabs
            variant="outline"
            defaultValue={path}
            // onTabChange={(value) => router.push(`${value}`)}
          >
            <Tabs.List>
              <LinkButton link="/" icon={<Home />} />
              {!user.isSignedIn
                ? (
                  <LinkButton link="/Signin" icon={<Login />} />
                )
                : (
                  <>
                    <LinkButton link="/CreateQuestion" icon={<Plus />} />
                    <LinkButton
                      link="/user-profile"
                      icon={image == "" ? <IconUser /> : (
                        <Image
                          className="avatar"
                          src={image}
                          alt="No image"
                          width="20"
                          height="20"
                        />
                      )}
                    />
                  </>
                )}
            </Tabs.List>
          </Tabs>
        </Center>
      </Affix>
    </>
  );
}
