const { Telegraf } = require('telegraf');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');

// configure environment
dotenv.config({ path: '.env' });

// toekn initializtion
const token = process.env.BOT_TOKEN;

if (token === undefined) {
  throw new Error('Token must be provided');
}

// Bot instatiation
const bot = new Telegraf(token);

// replys initializations

const welcomeMsg = `Welcome to Telegram Documents Backup\nType '/help' for help`;
const helpMsp = ``;

// Start
bot.start(ctx => ctx.reply(welcomeMsg));

// help init
bot.help(ctx => ctx.reply('Send me a sticker'));

// handle media
const media = ['photo', 'document'];

bot.on('photo', async ctx => {
  console.log(ctx.message);
  const { file_id } = ctx.message.photo.pop();

  const url = await ctx.telegram.getFileLink(file_id);
  ctx.reply(url);
});

// hande cocument

bot.on('document', async ctx => {
  const { file_id: fileId } = ctx.update.message.document;
  const fileUrl = await ctx.telegram.getFileLink(fileId);
  const response = await axios.get(fileUrl);
  ctx.reply('I read the file for you! The contents were:\n\n' + response.data);
});

bot.launch();
