const express = require('express');
const passport = require('passport');
const router = express.Router();
const friendshipController = require('../controllers/friendship_controller');

router.get('/add/',passport.checkAuthentication, friendshipController.addFriend);
router.get('/remove/',passport.checkAuthentication , friendshipController.removeFriend);

module.exports = router;
