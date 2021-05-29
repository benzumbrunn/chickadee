import { FastifyInstance } from "fastify";
import sendMail from "./sendMail";
import telegramBotStatus from "./telegram-bot-status";

const initRoutes = async (server: FastifyInstance) => {
  try {
    await sendMail(server);
    await telegramBotStatus(server);
  } catch (err) {
    console.error('Failed to initialize routes', err);
  }
}

export default initRoutes;
