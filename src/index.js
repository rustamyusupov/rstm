const express = require('express');
const logger = require('morgan');
const path = require('path');

const routes = require('./routes');
const api = require('./api');

const viewsPath = path.join(__dirname, '/pages');
const iconsPath = path.join(__dirname, '/icons');
const stylesPath = path.join(__dirname, '/styles');
const scriptsPath = path.join(__dirname, '/scripts');

const app = new express();

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(iconsPath));
app.use(express.static(stylesPath));
app.use(express.static(scriptsPath));
app.use(routes);
app.use(api.routes, api.router);

module.exports = app;
