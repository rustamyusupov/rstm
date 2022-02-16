const request = require('./utils/request');

module.exports = {
  list: cb => request('/api/categories').then(cb),
};
