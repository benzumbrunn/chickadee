import { expect } from "chai";
import jellyfish from "../src/jellyfish";

describe('jellyfish', async () => {
  it('getmininginfo', async () => {
    const miningInfo = await jellyfish.mining.getMiningInfo();

    expect(miningInfo).to.have.property('blocks');
    expect(miningInfo).to.have.property('difficulty');
    expect(miningInfo).to.have.property('networkhashps');
    expect(miningInfo).to.have.property('pooledtx');
    expect(miningInfo).to.have.property('chain');
    expect(miningInfo).to.have.property('isoperator');
    expect(miningInfo).to.have.property('masternodes');
    expect(miningInfo).to.have.property('warnings');
  });
});
