const _ = require("lodash");
const sqlite3 = require("sqlite3");
const debug = require("debug")("demo:booking");
const db = new sqlite3.Database("demo.db");

// Create database and tables
db.serialize(() => {
  const sql = `
      CREATE TABLE IF NOT EXISTS Booking (
        id   INTEGER PRIMARY KEY, 
        datetime DATETIME NOT NULL, 
        party    TINYINT NOT NULL, 
        name     TEXT NOT NULL, 
        email    TEXT NOT NULL, 
        phone    TEXT, 
        message  TEXT 
      )`;
  db.run(sql);
});

// List all functions

function getAll() {
  return db.all("SELECT * FROM Booking");
}

function create(bookingModel) {
  return new Promise((resolve, reject) => {
    validate(bookingModel)
      .then(save)
      .then((lastID) => resolve(lastID))
      .catch((error) => reject(error));
  });
}

function save(bookingModel) {
  const sql =
    "INSERT INTO Booking (datetime, party, name, email, phone, message) " +
    "VALUES (?, ?, ?, ?, ?, ?) ";
  const values = [
    bookingModel.datetime,
    bookingModel.party,
    bookingModel.name,
    bookingModel.email,
    bookingModel.phone,
    bookingModel.message,
  ];

  debug(`Saving ${values}`);
  return new Promise(function (resolve, reject) {
    db.run(sql, values, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

function validate(bookingModel) {
  debug(`Validating ${JSON.stringify(bookingModel)}`);

  // Working with Promise
  return new Promise((resolve, reject) => {
    try {
      const value = bookingModel.validator();
      return resolve(value);
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  create,
  getAll,
  save,
  validate,
};
