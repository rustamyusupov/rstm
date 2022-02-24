const request = require('./utils/request');

module.exports = {
  list: async () => {
    const categories = await request('/api/categories?_embed=wishes');
    const currencies = await request('/api/currencies');

    return categories.map(({ wishes, ...category }) => ({
      wishes: wishes.map(({ currencyId, ...wish }) => ({
        currency: currencies.find(c => c.id === currencyId)?.name,
        ...wish,
      })),
      ...category,
    }));
  },
  item: id => request(`/api/wishes/${id}`),
};
