const sqlite3 = jest.createMockFromModule("sqlite3");

function Database() {
  return {
    serialize: function () {},
    run: (sql, params, callback) => callback.call({ lastID: 9999 }),
  };
}

sqlite3.Database = Database;
module.exports = sqlite3;
