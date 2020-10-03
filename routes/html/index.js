const express = require('express');
const router = express.Router();

router.use('/html', require('./html'));

module.exports = router;