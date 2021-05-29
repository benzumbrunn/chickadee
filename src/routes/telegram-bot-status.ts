import { FastifyInstance } from "fastify";
import telegramBot from "../telegram/telegramBot";

const telegramBotStatus = async (server: FastifyInstance) => {
  server.get('/telegram-bot-status', async (_request, _reply) => {
    const messageListenerCount = telegramBot.listeners('message').length.toString();
    const isPolling = telegramBot.isPolling();
    const commands = telegramBot.getMyCommands();

    return {
      messageListenerCount,
      isPolling,
      commands,
    };
  })
}

export default telegramBotStatus;
