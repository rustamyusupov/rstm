const express = require('express');

const index = require('./controllers');
const auth = require('./controllers/auth');
const wishes = require('./controllers/wishes');

const router = express.Router();

router.get('/', index);
router.get('/login', auth.login);
router.post('/login', auth.signin);
router.get('/wishes', wishes.list);
router.post('/wishes/add', wishes.add);
router.get('/wishes/:id', wishes.item);
router.post('/wishes/:id', wishes.update);

module.exports = router;
