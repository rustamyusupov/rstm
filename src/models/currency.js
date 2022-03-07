const db = require('../utils/db');

const getList = async () => {
  const results = await db.query('SELECT * FROM currencies');

  return results.rows || [];
};

module.exports = { getList };
