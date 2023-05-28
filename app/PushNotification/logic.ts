import { sendPush } from "./messaging";

export async function sendMsgToAll({
  title,
  msg,
}: {
  title: string;
  msg: string;
}) {
  await fetch(
    `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/users/pushAllDevices`,
    {
      method: "GET",
    }
  ).then(async (e: any) => {
    const devices = await e.json();
    devices.forEach((device: any) => {
      sendPush(title, msg, device.device);
    });
  });
}

export async function sendMsg({
  title,
  msg,
  user,
}: {
  title: string;
  msg: string;
  user: any;
}) {
  await fetch(
    `${process.env.NEXT_PUBLIC_HOSTING_SERVER}/users/pushDevices?username=${user.username}`,
    {
      method: "GET",
    }
  ).then(async (e: any) => {
    const devices = await e.json();
    devices.forEach((device: any) => {
      sendPush(title, msg, device.device);
    });
  });
}

export async function subscribeToTopic(
  user: any,
  topic: string,
  subscribed: boolean
) {
  await fetch(`${process.env.NEXT_PUBLIC_HOSTING_SERVER}/users/topics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: user,
      topic: topic,
      subscribed: subscribed,
    }),
  });
}
