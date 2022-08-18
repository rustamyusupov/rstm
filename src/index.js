const express = require('express');
const logger = require('morgan');
const path = require('path');

const session = require('./utils/session');
const routes = require('./routes');

const viewsPath = path.join(__dirname, '/views');
const publicPath = path.join(__dirname, '..', '/public');
const chartistPath = path.join(__dirname, '..', '/node_modules/node-chartist');

const app = new express();

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use('/chartist', express.static(chartistPath));
app.use(session);
app.use(routes);

module.exports = app;
