import server from './src/server';
import telegramBot from './src/telegram/telegramBot';

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

telegramBot.startPolling();
