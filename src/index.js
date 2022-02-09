const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3000;
const public = path.join(__dirname, '..', '/public');

const server = () => {
  const app = new express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(public));

  return app;
};

server().listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
