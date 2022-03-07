const db = require('../configs/db');
const category = require('../models/category');
const currency = require('../models/currency');

const filterByCategory =
  id =>
  ({ category_id }) =>
    category_id === id;

const sort = (a, b) => b.sort - a.sort;

const getCurrency =
  currencies =>
  ({ currency_id, ...wish }) => ({
    currency: currencies.find(({ id }) => currency_id === id)?.name,
    ...wish,
  });

const getPrice = ({ price, currency, ...wish }) => ({
  price: Math.ceil(price).toLocaleString('ru', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }),
  ...wish,
});

const getArchive = wish => ({
  ...wish,
  archive: wish.archive === 'on',
});

const list = async archive => {
  const categories = await category.list();
  const currencies = await currency.list();
  const query = `SELECT * FROM wishes ${
    archive ? '' : 'WHERE archive = false'
  }`;
  const wishes = await db.query(query);

  const result = categories.map(({ id, ...category }) => ({
    wishes: wishes.rows
      ?.filter(filterByCategory(id))
      .sort(sort)
      .map(getCurrency(currencies))
      .map(getPrice),
    ...category,
  }));

  return Array.isArray(result) ? result : [];
};

const item = async id => {
  if (id === 'add') {
    return {};
  }

  const query = `SELECT * FROM wishes WHERE id = '${id}'`;
  const result = await db.query(query);

  return result.rows?.[0];
};

const update = async (id, body) => {
  const data = getArchive(body);
  const values = Object.entries(data)
    .map(([name, value]) => `${name}='${value}'`)
    .join(',');
  const query = `UPDATE wishes SET ${values} WHERE id = ${id} RETURNING id`;
  const result = await db.query(query);

  return result.rows?.[0];
};

const add = async body => {
  const data = getArchive(body);
  const columns = Object.keys(data).join(',');
  const values = Object.values(data)
    .map(value => `'${value}'`)
    .join(',');
  const query = `INSERT INTO wishes (${columns}) VALUES (${values}) RETURNING id`;
  const result = await db.query(query);

  return result.rows?.[0];
};

const remove = async id => {
  const query = `DELETE FROM wishes WHERE id = ${id}`;
  const result = await db.query(query);

  return result;
};

module.exports = { list, item, update, add, remove };
