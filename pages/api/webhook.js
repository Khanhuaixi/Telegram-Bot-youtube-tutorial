// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { cricketCommand } from "@/utils/commands/cricket";
import { helpCommand } from "@/utils/commands/help";
import { pingCommand } from "@/utils/commands/ping";
import { sendVideoByUrlCommand } from "@/utils/commands/sendVideoByUrl";
import { sendMessage, sendVideoByUrl } from "@/utils/telegram";

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method=="POST") {
    console.log("Request Body:", req.body);
    const chatId = req.body.message.chat.id;
    const text = req.body.message.text;
    console.log("ChatID", chatId);
    console.log("text", text);
    if (text.startsWith("/start") || text.startsWith("/help") ) {
      await helpCommand(chatId)
    }
    else if (text.startsWith("/ping")){
      await pingCommand(chatId);
    }
    // else if (text.startsWith("/cricket")) {
    //   await cricketCommand(chatId);
    // }  
    else if (text.startsWith("/gallery")) {
      await sendVideoByUrlCommand(chatId, "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", "Sample Video from Gallery");
    }  
    else {
      await sendMessage(chatId,text);
    }
    res.status(200).send("OK") //important to send 200 response to telegram
  } else {
      res.setHeader('Allow', ['POST']);
      res.status(500).send('Method Not Allowed');
  }
}
