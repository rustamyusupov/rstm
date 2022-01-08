const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8000;

const server = () => {
  const app = new express();
  const publicFolder = path.join(__dirname, '..', 'public');
  const router = jsonServer.router(path.join(publicFolder, 'db.json'));

  app.use('/api', router);
  app.use(bodyParser.json());

  return app;
};

server().listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
