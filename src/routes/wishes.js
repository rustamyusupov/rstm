const express = require('express');

const wishes = require('../controllers/wishes');
const auth = require('../utils/auth');

const routes = express.Router();

// TODO: think about separate routes wishes and wish
routes.get('/', wishes.index);
routes.get('/add', auth, wishes.item);
routes.post('/add', auth, wishes.add);
routes.patch('/', auth, wishes.sort);

routes.get('/:id/edit', auth, wishes.item);
routes.get('/:id/chart', wishes.chart);
routes.post('/:id/edit', auth, wishes.update);
routes.delete('/:id/edit', auth, wishes.remove);

module.exports = routes;
