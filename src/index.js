const express = require('express');
const logger = require('morgan');
const path = require('path');

const routes = require('./routes');
const api = require('./routes/api');

const publicPath = path.join(__dirname, '..', '/public');
const viewsPath = path.join(__dirname, '/views');

const app = new express();

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(routes);
app.use(api.routes, api.router);

module.exports = app;
