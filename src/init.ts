import initDaemons from './daemons';
import * as database from './database';

export const init = async () => {
  await database.init();
  await database.initNodes();
  initDaemons();
}
