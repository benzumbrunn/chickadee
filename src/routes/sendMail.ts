import { FastifyInstance } from "fastify";
import test from "../email/test";

const sendMail = async (server: FastifyInstance) => {
  server.get('/', async (_request, _reply) => {
    return { status: 'up' };
  })

  server.get('/send-mail', async (request, reply) => {
    const info = await test({ name: 'Dee' });

    console.log(info);

    return info;
  })
}

export default sendMail;
