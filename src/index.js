const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');

const router = require('./router');

const publicPath = path.join(__dirname, '..', '/public');
const viewsPath = path.join(__dirname, '/views');

const app = new express();

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false, httpOnly: true },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(router);

app.get('*', (req, res) => res.redirect('/'));

module.exports = app;
