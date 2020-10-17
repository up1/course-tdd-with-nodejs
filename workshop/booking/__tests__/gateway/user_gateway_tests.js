const nock = require("nock");
const API_PORT = 9999;
const getAllUser = require("../../src/gateway/users_gateway");
const API_HOST = `http://localhost:${API_PORT}`;

describe("Call user service", () => {
  it("Check response from /users", async () => {
    // Mock server with 200
    nock(API_HOST)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/users")
      .reply(200, [{}, {}]);

    // Verify
    const response = await getAllUser();
    expect(response.data.length).toEqual(2);
  });

  it("Fail 404 /users", async () => {
    // Mock server with 404
    nock(API_HOST)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/users")
      .reply(404);

    // Verify
    const response = await getAllUser();
    expect(response.code).toEqual(500);
  });
});