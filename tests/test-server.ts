import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/server";

chai.use(chaiHttp);

server.listen(8080);
const testServer = chai.request(server.server);

export default testServer;
