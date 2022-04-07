const express = require('express');

const auth = require('./auth');
const home = require('./home');
const wishes = require('./wishes');

const routes = express.Router();

routes.use('/', home);
routes.use('/auth', auth);
routes.use('/wishes', wishes);
routes.use('*', (req, res) => res.redirect('/'));

module.exports = routes;
