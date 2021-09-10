const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");

// configure environment
dotenv.config({ path: ".env" });

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Handle sticker or photo update
bot.on(["sticker", "photo"], (ctx) => {
  console.log(ctx.message);
  return ctx.reply("Cool!");
});
