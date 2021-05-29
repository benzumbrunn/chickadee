import fastify from 'fastify'
import * as database from './database';

import initRoutes from './routes';

const server = fastify()

const init = async () => {
  await database.init();
  await database.initNodes();
  await initRoutes(server);
}

init();

export default server;
