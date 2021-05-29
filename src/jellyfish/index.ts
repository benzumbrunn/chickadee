import Jellyfish from '@defichain/jellyfish';
import config from "config";

const jellyfishConfig: any = config.get('jellyfish');

const jellyfish = new Jellyfish.Client(`http://${jellyfishConfig.rpcuser}:${jellyfishConfig.rpcpassword}@localhost:${jellyfishConfig.port}`, {
  timeout: 20000,
})

export default jellyfish;
