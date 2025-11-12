// msg, chatd
const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

export async function sendMessage(chatid, text) {
    const url = `${TELEGRAM_API_URL}/sendMessage`;
    try {
        const respose = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatid,
                text: text
            })
        })
        if (!respose.ok) {
            console.log("Failed to send message to telegram user", await respose.text());
        }
    } catch (err) {
        console.log("Error occured while sending message to telegram user", err);
    }
}

export async function sendVideoByUrl(chatid, videoUrl, caption = "") {
    console.log("Sending video to chatid:", chatid, "videoUrl:", videoUrl, "caption:", caption);
    const url = `${TELEGRAM_API_URL}/sendVideo`;
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatid,
                video: videoUrl,
                caption,
                supports_streaming: true
            }),
        });
        if (!res.ok) console.log("sendVideo failed:", await res.text());
    } catch (err) {
        console.log("Error sending video:", err);
    }
}

export async function sendMessageWithInlineKeyboard(chatid, text) {
    const url = `${TELEGRAM_API_URL}/sendMessage`;
    try {
        const respose = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatid,
                text: text,
                reply_markup: {
                    inline_keyboard: [
                        [
                            { "text": "✅ Confirm", "callback_data": "confirm" },
                            { "text": "❌ Cancel", "callback_data": "cancel" },
                        ],
                        [
                            { "text": "🌐 Open Website", "url": "https://example.com" }
                        ],
                    ]
                },
            })
        })
        if (!respose.ok) {
            console.log("Failed to send message to telegram user", await respose.text());
        }
    } catch (err) {
        console.log("Error occured while sending message to telegram user", err);
    }
}

