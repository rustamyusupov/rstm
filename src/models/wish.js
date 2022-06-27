const db = require('../utils/db');
const category = require('../models/category');
const currency = require('../models/currency');

const coinsInPrice = 100;
const decimalDigits = 2;

const convertPrice = price => Math.trunc(Math.round(price * coinsInPrice));

const filterByCategory =
  id =>
  ({ category_id }) =>
    category_id === id;

const sort = (a, b) => b.sort - a.sort;

const getCurrency =
  currencies =>
  ({ currency_id, ...rest }) => ({
    currency: currencies.find(({ id }) => currency_id === id)?.name,
    ...rest,
  });

const getPrice = ({ price, currency, ...rest }) => ({
  price: (price / coinsInPrice).toLocaleString('ru', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: decimalDigits,
  }),
  ...rest,
});

const getArchive = wish => ({
  ...wish,
  archive: wish.archive === 'on',
});

const getList = async archive => {
  const categories = await category.getList();
  const currencies = await currency.getList();
  const query = `SELECT * FROM wishes ${
    archive ? '' : 'WHERE archive = false'
  }`;
  const wishes = await db.query(query);

  const result = categories.map(({ id, ...rest }) => ({
    wishes: wishes.rows
      ?.filter(filterByCategory(id))
      .sort(sort)
      .map(getCurrency(currencies))
      .map(getPrice),
    ...rest,
  }));

  return Array.isArray(result) ? result : [];
};

const getItem = async id => {
  if (id === 'add') {
    return {};
  }

  const query = `SELECT * FROM wishes WHERE id = '${id}'`;
  const result = await db.query(query);
  const price = result.rows?.[0]?.price;

  if (price) {
    result.rows[0].price = price / coinsInPrice;
  }

  return result.rows?.[0];
};

const updateItem = async (id, body) => {
  const data = getArchive(body);
  const values = Object.entries(data)
    .map(
      ([name, value]) =>
        `${name}='${name === 'price' ? convertPrice(value) : value}'`
    )
    .join(',');
  const query = `UPDATE wishes SET ${values} WHERE id = ${id} RETURNING id`;
  const result = await db.query(query);

  return result.rows?.[0];
};

const addItem = async body => {
  const data = getArchive(body);
  const columns = Object.keys(data).join(',');
  const values = Object.entries(data)
    // .map(value => `'${value}'`)
    .map(
      ([name, value]) => `'${name === 'price' ? convertPrice(value) : value}'`
    )
    .join(',');
  const query = `INSERT INTO wishes (${columns}) VALUES (${values}) RETURNING id`;
  const result = await db.query(query);

  return result.rows?.[0];
};

const deleteItem = async id => {
  const query = `DELETE FROM wishes WHERE id = ${id}`;
  const result = await db.query(query);

  return result;
};

module.exports = { getList, getItem, updateItem, addItem, deleteItem };
