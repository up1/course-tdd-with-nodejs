let users;

function setup() {
  console.log("setup");
  users = ["jane", "bob"];
}

beforeEach(() => {
  setup();
});

afterEach(() => {
  // Clear
});

test("removing user", () => {
  expect(users).toHaveLength(2);
  users.pop();
  expect(users).toHaveLength(1);
});
test("adding user", () => {
  expect(users).toHaveLength(2);
  users.push("mark");
  expect(users).toHaveLength(3);
});
