import { FastifyInstance } from "fastify";
import sendMail from "./sendMail";
import telegramBotStatus from "./telegram-bot-status";

const initRoutes = async (server: FastifyInstance) => {
  await sendMail(server);
  await telegramBotStatus(server);
}

export default initRoutes;
