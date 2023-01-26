const db = require('../utils/db');
const { coinsInPrice } = require('../utils/constants');

const getList = async isAuth => {
  const query = `
    SELECT
      W.*, 
      Cat.name AS category, 
      Cur.name AS currency, 
      P.price / ${coinsInPrice}.00 AS price
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
    ORDER BY W.sort ASC, W.name ASC
  `;
  const result = await db.query(query);

  return result.rows;
};

const getItem = async id => {
  const query = `
    SELECT *, ROUND(P.price / ${coinsInPrice}.0, 2) AS price
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

  return result.rows?.[0];
};

const addItem = async data => {
  const columns = Object.keys(data).join(',');
  const values = Object.values(data)
    .map(value => `'${value}'`)
    .join(',');
  const query = `
    INSERT INTO wishes (${columns})
    VALUES (${values})
    RETURNING id
  `;
  const result = await db.query(query);

  return result.rows?.[0];
};

const updateItem = async (id, data) => {
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

  return result.rows?.[0];
};

const sortItems = async (category, id, sort = null) => {
  const query = `
    UPDATE wishes
    SET sort = CASE 
      WHEN sort IS NULL THEN (
        SELECT
          MAX(sort)
        FROM 
          wishes
      ) + 1
      WHEN id = ${id} AND sort IS NOT NULL THEN ${sort - 1} ELSE sort - 1
    END
    WHERE (${sort} IS NULL or sort < ${sort}) OR id = ${id} AND category_id = ${category}
  `;
  const result = await db.query(query);

  return result.rows?.[0];
};

const deleteItem = async id => {
  const query = `
    DELETE 
    FROM wishes
    WHERE id = ${id}
  `;
  const result = await db.query(query);

  return result;
};

module.exports = {
  getList,
  getItem,
  addItem,
  updateItem,
  sortItems,
  deleteItem,
};
