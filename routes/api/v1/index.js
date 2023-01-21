const express = require('express');
const passport = require('passport');

const router = express.Router();

router.use('/posts',require('./posts'));

module.exports = router;