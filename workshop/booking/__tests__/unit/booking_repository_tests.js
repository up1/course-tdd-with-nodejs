const BookingModel = require("../../src/model/booking_model");
const bookingRepository = require("../../src/booking_repository");

describe("Booking Repository", () => {
  test("should pass a valid booking with no optional fields", async () => {
    const bookingModel = new BookingModel({
      party: 3,
      name: "Family",
      email: "username@example.com",
      date: "2020/10/15",
      time: "06:02 AM",
      phone: "xxx",
      message: "yyy",
    });

    const value = await bookingRepository.validate(bookingModel);
    expect(value).toStrictEqual(bookingModel);
  });

  test("should fail a invalid booking with bad email", async () => {
    const bookingModel = new BookingModel({
      party: 2,
      name: "Family",
      email: "username",
      date: "2020/10/15",
      time: "06:02 AM",
      phone: "xxx",
      message: "yyy",
    });
    
    await expect(bookingRepository.validate(bookingModel)).rejects.toThrow(
      new Error('"email" must be a valid email')
    );
  });
});
