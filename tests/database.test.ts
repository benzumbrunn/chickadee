import { expect } from "chai";
import * as database from '../src/database';

describe('database', async () => {
  before(async () => {
    await database.init();
  });

  it('test adding node', async () => {
    await database.addNode('testId', 'testOperator');
    const nodes = await database.getAllNodes();

    expect(nodes[0].masternode_id).to.be.equal('testId');
    expect(nodes[0].masternode_operator).to.be.equal('testOperator');
    expect(nodes[0].mintedblocks).to.be.equal(0);
    expect(nodes[0]).to.have.property('created_at');
  });

  after(() => {
    database.close();
  });
});
