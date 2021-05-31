import { init } from './src/init';
import logger from './src/logger';
import telegramBot from './src/telegram/telegramBot';

init().catch(e => logger.error(e)).then(() => {
  logger.info('Application started successfully');
})

telegramBot.startPolling();
