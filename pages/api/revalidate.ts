import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.token !== process.env.NEXT_PUBLIC_SECRETKEY) return res.status(401).json({ message: `Invalid token` });
  console.log("Revalidating with", process.env.NEXT_PUBLIC_SECRETKEY, req.query.token)
  try {
    console.log("Revalidated")
    await res.revalidate("/");
    return res.json({ revalidated: "Yes" });
  } catch (err: any) {
    console.log(err.message)
    return res.status(500).send(err);
  }
}
