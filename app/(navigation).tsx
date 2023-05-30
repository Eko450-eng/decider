"use client";

import Image from "next/image";
import { Affix, Center, Modal, Tabs } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { startTransition, useEffect, useState } from "react";
import { Home, Login, Plus, Reload } from "tabler-icons-react";
import Push from "./PushNotification/page";
import { useAuth, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface LinkButtonProps {
  link?: any;
  icon: any;
  label: string;
}

function LinkButton({ link, icon, label }: LinkButtonProps) {
  return (
    <Tabs.Tab aria-label={label} value={link}>
      <Link aria-label={label}  href={link}>
        {icon}
      </Link>
    </Tabs.Tab>
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
          <Tabs variant="default" defaultValue={path}>
            <Tabs.List>
              <LinkButton label="Home" link="/" icon={<Home />} />
              {!user.isSignedIn ? (
                <LinkButton label="Sign in" link="/Signin" icon={<Login />} />
              ) : (
                <>
                  <LinkButton
                    label="Create a question"
                    link="/CreateQuestion"
                    icon={<Plus />}
                  />
                  <LinkButton
                    label="Profile"
                    link="/user-profile"
                    icon={
                      image == "" ? (
                        <IconUser />
                      ) : (
                        <Image
                          className="avatar"
                          src={image}
                          alt="No image"
                          width="20"
                          height="20"
                        />
                      )
                    }
                  />
                </>
              )}

              <Tabs.Tab
                aria-label="Reload"
                onClick={() => {
                  startTransition(() => {
                    router.refresh();
                  });
                }}
                value={"/reload"}
              >
                {<Reload />}
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Center>
      </Affix>
    </>
  );
}
