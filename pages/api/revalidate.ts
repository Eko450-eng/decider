import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("ran", process.env.NEXT_PUBLIC_SECRETKEY, req.query.token)
  if (req.query.token !== process.env.NEXT_PUBLIC_SECRETKEY)
    return res.status(401).json({ message: `Invalid token` });
  try {
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
