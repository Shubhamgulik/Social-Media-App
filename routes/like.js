const express = require('express');
const passport = require('passport');
const likesController = require('../controllers/likes_controller');
const router = express.Router();

router.get('/toggle/',passport.checkAuthentication ,likesController.toggleLike);

module.exports = router;
