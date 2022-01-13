const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8080;

const server = () => {
  const app = new express();
  const router = jsonServer.router(path.join(__dirname, 'db.json'));
  const routes = jsonServer.rewriter({
    '/api/*': '/$1',
    '/categories': '/categories?_embed=wishes',
  });

  app.use(routes);
  app.use(router);
  app.use(bodyParser.json());

  return app;
};

server().listen(port, () => {
  console.log(`Listening on port ${port}`);
});
