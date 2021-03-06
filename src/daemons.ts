import { isNewRewardForNode, updateMintedBlocks } from "./database";
import jellyfish from "./jellyfish";
import logger from "./logger";
import { sendRewardMessage } from "./telegram/telegramBot";

const initDaemons = () => {
  fetchNodeRewardsDaemon();
}

const fetchNodeRewardsDaemon = () => {
  setInterval(async () => {
    logger.info('running updateNodeRewardDaemon');
    const miningInfo = await jellyfish.mining.getMiningInfo();
    await Promise.all(miningInfo.masternodes.map(async node => {
      if (node.masternodeid && node.mintedblocks) {
        if (await isNewRewardForNode(node.masternodeid, node.mintedblocks)) {
          await updateMintedBlocks(node.masternodeid, node.mintedblocks);
          await sendRewardMessage(node.masternodeid, node.mintedblocks);
        };
      }
    }));
  }, 5 * 60 * 1000);
}

export default initDaemons;
