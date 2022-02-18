const express = require('express');
const logger = require('morgan');
const path = require('path');
const jsonServer = require('json-server');

const router = require('./router');

const publicPath = path.join(__dirname, '..', '/public');
const viewsPath = path.join(__dirname, '/views');
const db = path.join(__dirname, 'db.json');

const app = new express();
const api = jsonServer.router(db);

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(router);
app.use('/api', api);
app.get('*', (req, res) => res.redirect('/'));

module.exports = app;
