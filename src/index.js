const express = require('express');
const path = require('path');
const logger = require('morgan');

const routes = require('./routes');

const port = process.env.PORT || 3000;
const viewsPath = path.join(__dirname, '/views');
const publicPath = path.join(__dirname, '..', '/public');

const server = () => {
  const app = new express();

  app.set('view engine', 'pug');
  app.set('views', viewsPath);

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(publicPath));
  app.use('/', routes);

  return app;
};

server().listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
