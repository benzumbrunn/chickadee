import { expect } from "chai";
import * as database from '../src/database';

describe.only('database', async () => {
  it('basic tests', async () => {
    await database.init();
    await database.addNode('testId', 'testOperator');
    const nodes = await database.getAllNodes();
    expect(nodes[0].id).to.be.equal(1);
    expect(nodes[0].masternode_id).to.be.equal('testId');
    expect(nodes[0].masternode_operator).to.be.equal('testOperator');
  });
});
