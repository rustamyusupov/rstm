const express = require('express');

const home = require('../controllers/home');

const routes = express.Router();

routes.get('/', home.index);

module.exports = routes;
