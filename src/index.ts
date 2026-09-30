import Bot from "./lib/bot.js";
import getPostText from "./lib/getPostText.js";

const text = await Bot.run(getPostText);

if (text === null) {
	console.log(`[${new Date().toISOString()}] No releases found today, nothing posted.`);
} else {
	console.log(`[${new Date().toISOString()}] Posted: "${text}"`);
}
