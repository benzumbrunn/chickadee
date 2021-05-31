import TelegramBot from 'node-telegram-bot-api';
import config from "config";
import logger from '../logger';

const telegramConfig: any = config.get('telegram');

const telegramBot = new TelegramBot(telegramConfig.botToken);

export const sendRewardMessage = async (masternodeId: string, numberOfBlocks: number) => {
  const message = `New reward minted for ${masternodeId}, reward no. ${numberOfBlocks}`;
  await telegramBot.sendMessage(telegramConfig.developerChatId, message);
  logger.info(message);
}

export default telegramBot;
