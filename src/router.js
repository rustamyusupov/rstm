const express = require('express');

const index = require('./controllers');
const wishes = require('./controllers/wishes');

const router = express.Router();

router.get('/', index);
router.get('/wishes', wishes.list);
router.get('/wishes/:id', wishes.item);
router.post('/wishes/:id', wishes.update);

module.exports = router;
