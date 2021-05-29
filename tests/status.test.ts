import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import testServer from "./test-server";

chai.use(chaiHttp);

describe('status', () => {
  it('test status endpoint', async () => {
    const res = await testServer.get('/');
    expect(res.status).to.be.equal(200);
  });
});
