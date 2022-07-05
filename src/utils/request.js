const axios = require('axios');

const request = (url, options) =>
  axios(url, options).then(response => response?.data);

module.exports = { request };
