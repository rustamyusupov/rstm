const db = require('../utils/db');
const { coinsInPrice } = require('../utils/constants');

const getPriceInCoins = value =>
  Math.trunc(Math.round(Number(value) * coinsInPrice));

const getCurrent = async id => {
  const query = `SELECT * FROM prices WHERE wish_id = '${id}' ORDER BY created_at DESC LIMIT 1`;
  const results = await db.query(query);

  if (results.rows?.[0]?.price) {
    results.rows[0].price = results.rows?.[0]?.price / coinsInPrice;
  }

  return results.rows?.[0];
};

const addItem = async (id, price) => {
  const value = getPriceInCoins(price);

  const query = `
    INSERT INTO prices (price, wish_id)
    VALUES (${value}, ${id})
  `;
  const result = await db.query(query);

  return result.rows?.[0];
};

const addItems = async prices => {
  const values = prices
    .map(({ id, price }) => `(${id}, ${getPriceInCoins(price)})`)
    .join(', ');
  const query = `
    INSERT INTO prices (wish_id, price)
    VALUES ${values}
    RETURNING *;
    `;
  const result = await db.query(query);

  return result.rows;
};

const deleteItem = async id => {
  const query = `
    DELETE
    FROM prices
    WHERE wish_id = ${id}
  `;
  const result = await db.query(query);

  return result;
};

module.exports = { getCurrent, addItem, deleteItem, addItems };
