const express = require('express');

const wishes = require('../controllers/wishes');
const auth = require('../utils/auth');

const routes = express.Router();

routes.get('/', wishes.index);
routes.get('/:id/edit', auth, wishes.item);
routes.get('/add', auth, wishes.item);
routes.get('/:id/chart', wishes.chart);
routes.post('/add', auth, wishes.add);
routes.post('/:id/edit', auth, wishes.update);
routes.delete('/:id/edit', auth, wishes.remove);

module.exports = routes;
