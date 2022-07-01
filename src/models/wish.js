const { coinsInPrice } = require('../utils/constants');

const db = require('../utils/db');

const convertPrice = price =>
  Math.trunc(Math.round(Number(price) * coinsInPrice));

const getArchive = wish => ({
  ...wish,
  archive: wish.archive === 'on',
});

const getList = async isAuth => {
  const query = `
    SELECT W.*, Cat.name AS category, Cur.name AS currency, P.price
    FROM wishes W
    JOIN categories Cat ON W.category_id = Cat.id
    JOIN currencies Cur ON W.currency_id = Cur.id
    JOIN prices P ON W.id = P.wish_id
      AND P.created_at = (
        SELECT created_at
        FROM prices
        WHERE wish_id = W.id
        ORDER BY created_at DESC
        LIMIT 1
      )
    ${isAuth ? '' : 'WHERE archive = false'}
  `;
  const result = await db.query(query);

  return result.rows;
};

const getItem = async id => {
  if (id === 'add') {
    return {};
  }

  const query = `
    SELECT *, P.price
    FROM wishes W
    JOIN prices P ON W.id = P.wish_id
    AND P.created_at = (
      SELECT created_at
      FROM prices
      WHERE wish_id = W.id
      ORDER BY created_at DESC
      LIMIT 1
    )
    WHERE W.id = '${id}'
  `;
  const result = await db.query(query);
  const price = result.rows?.[0]?.price;

  if (price) {
    result.rows[0].price = price / coinsInPrice;
  }

  return result.rows?.[0];
};

const addItem = async body => {
  // TODO: think about convert in a query
  const data = getArchive(body);

  delete data.price;

  const columns = Object.keys(data).join(',');
  const values = Object.values(data)
    .map(value => `'${value}'`)
    .join(',');
  const wishesQuery = `
    INSERT INTO wishes (${columns})
    VALUES (${values})
    RETURNING id
  `;
  const result = await db.query(wishesQuery);

  // TODO: rewrite in one query
  const priceQuery = `
    INSERT INTO prices (price, wish_id)
    VALUES (${convertPrice(body.price)}, ${result.rows?.[0].id})
  `;
  await db.query(priceQuery);

  return result.rows?.[0];
};

const updateItem = async (id, body) => {
  // TODO: think about convert in a query
  const data = getArchive(body);

  delete data.price;

  const values = Object.entries(data)
    .map(([key, value]) => `${key}='${value}'`)
    .join(',');
  const query = `
    UPDATE wishes
    SET ${values}
    WHERE id = ${id}
    RETURNING id
  `;
  const result = await db.query(query);

  // TODO: rewrite in one query
  const price = convertPrice(body.price);
  const priceQuery = `
    INSERT INTO prices (price, wish_id)
    VALUES (${price}, ${result.rows?.[0].id})
  `;
  await db.query(priceQuery);

  return result.rows?.[0];
};

const deleteItem = async id => {
  const pricesQuery = `
    DELETE 
    FROM prices
    WHERE wish_id = ${id}
  `;
  await db.query(pricesQuery);

  // TODO: rewrite in one query
  const wishesQuery = `
    DELETE 
    FROM wishes
    WHERE id = ${id}
  `;
  const result = await db.query(wishesQuery);

  return result;
};

module.exports = { getList, getItem, addItem, updateItem, deleteItem };
