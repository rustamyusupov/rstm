const db = require('../utils/db');

const getList = async () => {
  const results = await db.query('SELECT * FROM categories');

  return results.rows || [];
};

module.exports = { getList };
