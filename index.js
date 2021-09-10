const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');

// configure environment
dotenv.config({ path: '.env' });

// replys initializations

const welcomeMsg = `Welcome to Telegram Documents Backup\nType '/help' for help`;
const helpMsp = ``;

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply(welcomeMsg));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

// Handle sticker or photo update
bot.on(['sticker', 'photo'], ctx => {
  console.log(ctx.message);
  return ctx.reply('Cool!');
});

bot.launch();
