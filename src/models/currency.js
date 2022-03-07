const db = require('../configs/db');

const list = async () => {
  const results = await db.query('SELECT * FROM currencies');

  return results.rows || [];
};

module.exports = { list };
