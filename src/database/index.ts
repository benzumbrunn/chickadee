import sqlite3 from 'sqlite3';
import Knex from 'knex';
import jellyfish from '../jellyfish';

const filename = process.env.NODE_ENV === 'test' ? ':memory:' : 'chickadee.db'

const db = new sqlite3.Database(filename, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Connected to ${filename} SQlite database.`);
});

const knex = Knex({
  client: 'sqlite',
  connection: {
    filename: process.env.NODE_ENV === 'test' ? ':memory:' : 'chickadee.db',
  },
});

const init = async () => {
  if (!(await knex.schema.hasTable('nodes'))) {
    await knex.schema.createTable('nodes', (table) => {
      table.increments();
      table.string('masternode_id');
      table.string('masternode_operator');
      table.dateTime('created_at');
    });
  }
}

const close = async () => {
  knex.destroy();
}

const addNode = async (masternodeId: string, masternodeOperator: string) => {
  await knex('nodes').insert([{
    masternode_id: masternodeId,
    masternode_operator: masternodeOperator,
    created_at: Date.now(),
  }]);
}

const initNodes = async () => {
  const miningInfo = await jellyfish.mining.getMiningInfo();
  miningInfo.masternodes.forEach(async node => {
    if (!(await knex.select(['masternode_id']).from('nodes')) && node.masternodeid && node.masternodeoperator) {
      addNode(node.masternodeid, node.masternodeoperator);
    }
  });
}

const getAllNodes = async () => {
  return knex.select().from('nodes');
}

export {
  knex,
  init,
  close,
  addNode,
  initNodes,
  getAllNodes,
}
