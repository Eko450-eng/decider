import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { Webhook, WebhookRequiredHeaders } from "svix";

const WHSECRET = process.env.NEXT_PUBLIC_CLERK_WH_SS || ""

export async function handler(req: Request) {
  const payload = await req.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(WHSECRET);
  let evt: Event | null = null

  try{
    evt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event
  } 
  catch(err){
    console.log(err)
  }

  if(!evt) return
  const eventType: EventType = evt.type
}

type EventType = "user.created" | "user.updated" | "user.delted" | "*"
