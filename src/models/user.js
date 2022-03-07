const db = require('../configs/db');

const item = async email => {
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  const results = await db.query(query);

  return results.rows?.[0];
};

module.exports = { item };
