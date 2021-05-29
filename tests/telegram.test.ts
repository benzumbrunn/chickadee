
import config from "config";
import { sendRewardMessage } from "../src/telegram/telegramBot";

const jellyfishConfig: any = config.get('jellyfish');

describe('telegram', async () => {
  it('send reward message to self', async () => {
    await sendRewardMessage();
  });
});
