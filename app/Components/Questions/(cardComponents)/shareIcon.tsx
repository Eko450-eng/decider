"use client"
import { showNotification } from "@mantine/notifications";
import { Share } from "tabler-icons-react";
interface IButtonProps {
  title?: string;
  message?: string;
  color?: string;
  link: string;
}

export default function ShareIcon(ButtonProps: IButtonProps) {
  const { link, color, message, title } = ButtonProps;
  return (
    <Share
      size={"1rem"}
      className="icon-floating"
      onClick={() => {
        navigator.clipboard.writeText(link);
        showNotification({
          title: title ?? "Link copied",
          message: message ?? "You can share the link with anyone now",
          color: color ?? "orange",
        });
      }}
    />
  );
}
