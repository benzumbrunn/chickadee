import { sendRewardMessage } from "../src/telegram/telegramBot";

describe('telegram', async () => {
  it('send reward message to self', async () => {
    await sendRewardMessage('testnode', 1);
  });
});
