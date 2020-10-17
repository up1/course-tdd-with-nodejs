beforeAll(() => {
  console.log("beforeAll");
});

beforeEach(() => {
  console.log("beforeEach");
});

afterAll(() => {
  console.log("afterAll");
});

afterEach(() => {
  console.log("afterEach");
});

describe("outer", () => {
  console.log("descibe outer");
  describe("inner", () => {
    console.log("descibe inner");
    test("inner", () => {
      console.log("outer.inner test");
    });
  });

  test("outer test", () => {
    console.log("outer test");
  });

  describe("inner 2", () => {
    console.log("descibe inner 2");
    test("inner 2", () => {
      console.log("outer.inner 2 test");
    });
  });
});
