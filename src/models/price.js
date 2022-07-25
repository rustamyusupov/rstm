const db = require('../utils/db');
const getPriceInCoins = require('../utils/getPriceInCoins');

const addItem = async (id, price) => {
  const value = getPriceInCoins(price);

  const query = `
    INSERT INTO prices (price, wish_id)
    VALUES (${value}, ${id})
  `;
  const result = await db.query(query);

  return result.rows?.[0];
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

module.exports = { addItem, deleteItem };
