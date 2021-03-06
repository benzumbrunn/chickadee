import Knex from 'knex';
import jellyfish from '../jellyfish';
import logger from '../logger';

const knex = Knex({
  client: 'sqlite',
  connection: {
    filename: process.env.NODE_ENV === 'test' ? ':memory:' : 'chickadee.db',
  },
});

const init = async () => {
  try {
    if (!(await knex.schema.hasTable('nodes'))) {
      await knex.schema.createTable('nodes', (table) => {
        table.string('masternode_id').primary();
        table.string('masternode_operator');
        table.integer('mintedblocks');
        table.dateTime('created_at');
      });
    }
  } catch (err) {
    logger.error('Failed to initialize database', err);
  }
}

const close = async () => {
  knex.destroy();
}

const addNode = async (masternodeId: string, masternodeOperator: string) => {
  await knex('nodes').insert([{
    masternode_id: masternodeId,
    masternode_operator: masternodeOperator,
    mintedblocks: 0,
    created_at: Date.now(),
  }]);
}

const initNodes = async () => {
  try {
    const miningInfo = await jellyfish.mining.getMiningInfo();

    await Promise.all(miningInfo.masternodes.map(async node => {
      if ((await knex.select(['masternode_id']).from('nodes')).length === 0 && node.masternodeid && node.masternodeoperator) {
        await addNode(node.masternodeid, node.masternodeoperator);
        logger.info(`Created node ${node.masternodeid}`);
      }
    }));
  } catch (err) {
    logger.error('Failed to initialize nodes in database', err);
  }
}

const getAllNodes = async () => {
  return knex.select().from('nodes');
}

const isNewRewardForNode = async (masternodeId: string, currentMintedBlocks: number) => {
  const mintedBlocksObject = await knex.select(['mintedblocks']).from('nodes').where('masternode_id', masternodeId);
  const mintedBlocks = mintedBlocksObject[0].mintedblocks;
  if (currentMintedBlocks > mintedBlocks) {
    return true;
  }
  return false;
}

const updateMintedBlocks = async (masternodeId: string, currentMintedBlocks: number) => {
  await knex('nodes')
    .update({
      mintedblocks: currentMintedBlocks,
    })
    .where('masternode_id', masternodeId);
}

export {
  knex,
  init,
  close,
  addNode,
  initNodes,
  getAllNodes,
  isNewRewardForNode,
  updateMintedBlocks,
}
