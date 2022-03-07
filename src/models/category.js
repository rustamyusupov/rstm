const db = require('../configs/db');

const list = async () => {
  const results = await db.query('SELECT * FROM categories');

  return results.rows || [];
};

module.exports = { list };
