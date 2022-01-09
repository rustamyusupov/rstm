const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8080;

const server = () => {
  const app = new express();
  const router = jsonServer.router(path.join(__dirname, 'db.json'));

  app.use('/api', router);
  app.use(bodyParser.json());

  return app;
};

server().listen(port, () => {
  console.log(`Listening on port ${port}`);
});
