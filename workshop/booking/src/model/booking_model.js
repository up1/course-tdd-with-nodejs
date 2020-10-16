const moment = require("moment");
const Joi = require("joi");

module.exports = class BookingModel {
  constructor({ party, name, email, date, time, phone, message }) {
    this.party = party;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.datetime = BookingModel.combineDateTime(date, time);
  }

  /**
   * Combine a date and time into an ISO 8601 standard date and time.
   *
   * @example
   * // returns '2020-10-15T06:02:00.000Z'
   * Booking.combineDateTime('2020/10/15', '06:02 AM')
   *
   * @param {string} date YYYY/MM/DD format
   * @param {string} time H:mm A format
   * @return {string} ISO 8601 standard date and time.
   */
  static combineDateTime(date, time) {
    return moment.utc(`${date} ${time}`, "YYYY/MM/DD hh:mm A").toISOString();
  }

  async validator() {
    const schema = Joi.object().keys({
      datetime: Joi.date().iso().required().raw(),
      party: Joi.number().min(1).max(7).required(),
      name: Joi.string().max(255).required(),
      email: Joi.string().max(255).required().email(),
      phone: Joi.string().max(50).allow(""),
      message: Joi.string().max(1000).allow(""),
    });
    // Working with Async/Await
    const value = await schema.validateAsync(this);
    return value;
  }
};
