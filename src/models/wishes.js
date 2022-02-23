const request = require('./utils/request');

module.exports = {
  list: () => request('/api/categories?_embed=wishes'),
  item: id => request(`/api/wishes/${id}`),
};
