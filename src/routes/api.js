const jsonServer = require('json-server');
const path = require('path');

const db = path.join(__dirname, '..', 'db.json');

const routes = jsonServer.rewriter({
  '/api/*': '/$1',
  '/categories': '/categories?_embed=wishes',
});
const router = jsonServer.router(db);

module.exports = { routes, router };
