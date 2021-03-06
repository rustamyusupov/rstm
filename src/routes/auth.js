const express = require('express');

const auth = require('../controllers/auth');

const routes = express.Router();

routes.get('/', auth.index);
routes.post('/', auth.signin);
routes.get('/logout', auth.signout);

module.exports = routes;
