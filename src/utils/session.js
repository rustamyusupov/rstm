const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);

const db = require('./db');

const ThirtyDays = 30 * 24 * 60 * 60 * 1000;
const pgSession = new PgSession({
  pool: db,
  tableName: 'session',
});

module.exports = session({
  cookie: {
    store: db,
    maxAge: ThirtyDays,
  },
  saveUninitialized: false,
  resave: false,
  secret: process.env.SESSION_SECRET,
  store: pgSession,
});
