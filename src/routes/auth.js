const express = require('express');

const auth = require('../controllers/auth');

const routes = express.Router();

routes.get('/', auth.index);
routes.post('/', auth.signin);

module.exports = routes;
