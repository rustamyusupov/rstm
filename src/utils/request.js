const axios = require('axios');

const instance = axios.create({ baseURL: 'http://localhost:3000' });

module.exports = (url, options) =>
  instance(url, options)
    .then(response => response.data)
    .catch(err => {
      console.log(err.response);
    });
