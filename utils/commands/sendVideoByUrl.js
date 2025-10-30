import { sendMessage, sendVideoByUrl } from "../telegram";

export async function sendVideoByUrlCommand(chatId, videoUrl, caption=""){
    await sendVideoByUrl(chatId, videoUrl, caption)
}