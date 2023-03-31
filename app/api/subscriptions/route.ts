import { getMessaging } from "firebase-admin/messaging";
import { initializeApp } from "firebase-admin/app";

// To be setup
// const firebaseConfig = initializeApp({
//   credential:
// });

export async function POST(req: Request) {
  const body = await req.json()
  const { tokens, topic } = body
  getMessaging().subscribeToTopic(tokens, topic)
    .then((res: any) => console.log(res))
}
