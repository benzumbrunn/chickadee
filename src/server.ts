import fastify from 'fastify'
import initDaemons from './daemons';
import * as database from './database';

import initRoutes from './routes';

const server = fastify()

export const init = async () => {
  await database.init();
  await database.initNodes();
  await initRoutes(server);
  initDaemons();
}

export default server;
