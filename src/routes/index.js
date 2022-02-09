const express = require('express');

const index = require('./main');
const wishes = require('./wishes');

const router = express.Router();

router.get('/', index);
router.get('/wishes', wishes);

module.exports = router;
