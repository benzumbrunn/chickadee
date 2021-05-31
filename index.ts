import { init } from './src/init';
import telegramBot from './src/telegram/telegramBot';

init().catch(e => console.error(e)).then(() => {
  console.log('Application started successfully')
})

telegramBot.startPolling();
