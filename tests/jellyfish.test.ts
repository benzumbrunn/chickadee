import jellyfish from "../src/jellyfish";

describe('status', async () => {
  it('test jellyfish', async () => {
    const miningInfo = await jellyfish.mining.getMiningInfo();
    console.log(miningInfo);
  });
});
