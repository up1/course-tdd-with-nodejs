const axios = require("axios").default;
const process = require("process");

function getAllUser() {
  return axios({
    method: "get",
    url: `${process.env.API_URL}/users`,
    responseType: "json",
  })
    .then((response) => {
      return {
        code: 200,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        code: 500,
      };
    });
}

module.exports = getAllUser;