import { verifySignature } from "@upstash/qstash/nextjs";
import { addHours, format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN as string);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // get current date
  const now = new Date();

  // add 7 hours to current date
  const future = addHours(now, 7);

  // format date with this format: Jul, 31 2021 12:00:00
  const formattedDate = format(future, "MMM, dd yyyy HH:mm:ss");

  try {
    // send message to telegram
    await bot.telegram.sendMessage(
      process.env.CHAT_ID as string,
      `Automatic Message sent from Next.js API using QStash cron at ${formattedDate}`
    );
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
