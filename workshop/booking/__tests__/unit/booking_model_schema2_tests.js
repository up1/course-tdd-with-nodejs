const BookingModel = require("../../src/model/booking_model");

describe("Validate booking model", () => {
  test("should pass a valid booking with no optional fields", async () => {
    const bookingModel = new BookingModel({
      party: 1,
      name: "Family",
      email: "username@example.com",
      date: "2020/10/15",
      time: "06:02 AM",
      phone: "xxx",
      message: "yyy",
    });
    const value = await bookingModel.validator();
    expect(value).toStrictEqual(bookingModel);
  });

  test("should fail a invalid booking with party not in 1-7", async () => {
    const bookingModel = new BookingModel({
      party: 10,
      name: "Family",
      email: "username@example.com",
      date: "2020/10/15",
      time: "06:02 AM",
      phone: "xxx",
      message: "yyy",
    });
    await expect(bookingModel.validator()).rejects.toThrow(
      new Error('"party" must be less than or equal to 7')
    );
  });

  test("should fail a invalid booking with bad email", async () => {
    const bookingModel = new BookingModel({
      party: 1,
      name: "Family",
      email: "username",
      date: "2020/10/15",
      time: "06:02 AM",
      phone: "xxx",
      message: "yyy",
    });
    await expect(bookingModel.validator()).rejects.toThrow(
      new Error('"email" must be a valid email')
    );
  });
});
