import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("If this is printed, the signature has already been verified");

  // do stuff
  res.status(200).json({ message: "Hello World" });
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
