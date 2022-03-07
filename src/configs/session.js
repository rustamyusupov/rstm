const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);

const db = require('./db');

module.exports = session({
  cookie: {
    store: db,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
  saveUninitialized: false,
  resave: false,
  secret: process.env.SESSION_SECRET,
  store: new PgSession({
    pool: db,
    tableName: 'session',
  }),
});
