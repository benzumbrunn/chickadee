import TelegramBot from 'node-telegram-bot-api';
import config from "config";

const telegramConfig: any = config.get('telegram');

const telegramBot = new TelegramBot(telegramConfig.botToken);

export const sendRewardMessage = async (masternodeId: string, numberOfBlocks: number) => {
  const message = `New reward minted for ${masternodeId}, reward no. ${numberOfBlocks}`;
  await telegramBot.sendMessage(telegramConfig.developerChatId, message);
  console.log(message);
}

telegramBot.on('message', (msg) => {
  const chatId = msg.chat.id;

  const text = msg.text;
  telegramBot.sendMessage(chatId, 'Received your message: ' + text);
  telegramBot.sendMessage(chatId, telegramBot.listeners("message").length.toString());
});

export default telegramBot;
