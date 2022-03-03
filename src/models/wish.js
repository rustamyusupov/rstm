module.exports = {
  list: async () => {
    // const categories = await request('/api/categories?_embed=wishes');
    // const currencies = await request('/api/currencies');

    // return categories.map(({ wishes, ...category }) => ({
    //   wishes: wishes.map(({ currencyId, ...wish }) => ({
    //     currency: currencies.find(c => c.id === currencyId)?.name,
    //     ...wish,
    //   })),
    //   ...category,
    // }));
    return [];
  },
  item: () => {}, // request(`/api/wishes/${id}`),
  add: () => {}, // request('/api/wishes', { method: 'post', data }),
  update: () => {}, // request(`/api/wishes/${id}`, { method: 'put', data }),
};
