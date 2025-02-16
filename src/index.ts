import Bot from "./lib/bot.js";
import getPostText from "./lib/getPostText.js";

const text = async () => {
	await Bot.run(getPostText);
};

console.log(`[${new Date().toISOString()}] Posted: "${text}"`);
