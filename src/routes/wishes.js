const express = require('express');

const wishes = require('../controllers/wishes');
const auth = require('../utils/auth');

const routes = express.Router();

routes.get('/', wishes.index);
routes.get('/:id', auth, wishes.item);
routes.get('/:id/chart', auth, wishes.chart);
routes.post('/add', auth, wishes.add);
routes.post('/:id', auth, wishes.update);
routes.delete('/:id', auth, wishes.remove);

module.exports = routes;
