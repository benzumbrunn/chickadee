import jellyfish from '@defichain/jellyfish';
import config from "config";

const jellyfishConfig: any = config.get('jellyfish');

describe('status', async () => {
  it('test jellyfish', async () => {
    const client = new jellyfish.Client(`http://${jellyfishConfig.rpcuser}:${jellyfishConfig.rpcpassword}@localhost:8555`, {
      timeout: 20000,
    })

    const miningInfo = await client.mining.getMiningInfo();
    console.log(miningInfo);
  });
});
