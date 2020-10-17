const BookingModel = require("../../src/model/booking_model");
const bookingRepository = require("../../src/booking_repository");

jest.unmock("sqlite3");

describe("Booking Repository", () => {
  test("should return booking id after created successfully", async() => {
    const bookingModel = new BookingModel({
      party: 3,
      name: "Family",
      email: "username@example.com",
      date: "2020/10/15",
      time: "06:02 AM",
      phone: "xxx",
      message: "yyy",
    });
    const lastID = await bookingRepository.create(bookingModel)
    expect(lastID).toBe(1234);
  });

});
