import Knex from 'knex';
import jellyfish from '../jellyfish';

const knex = Knex({
  client: 'sqlite',
  connection: {
    filename: process.env.NODE_ENV === 'test' ? ':memory:' : 'chickadee.db',
  },
});

const init = async () => {
  if (!(await knex.schema.hasTable('nodes'))) {
    await knex.schema.createTable('nodes', (table) => {
      table.string('masternode_id').primary();
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

  await Promise.all(miningInfo.masternodes.map(async node => {
    console.log(node);
    console.log(await knex.select(['masternode_id']).from('nodes'));
    if ((await knex.select(['masternode_id']).from('nodes')).length === 0 && node.masternodeid && node.masternodeoperator) {
      await addNode(node.masternodeid, node.masternodeoperator);
      console.log(`Created node ${node.masternodeid}`);
    }
  }));

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
