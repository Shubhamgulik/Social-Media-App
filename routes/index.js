const express = require('express');
const passport = require('passport');

const router = express.Router();

const homeController = require('../controllers/home_controller');
// const profileController = require('../controllers/profile_controller');



console.log("Router Loaded Successfully!!!!")
router.get('/',homeController.home);

router.use('/users',require('./user'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comment'));
router.use('/api',require('./api'));
router.use('/likes',require('./like'));
router.use('/friendship',require('./friendship'));
module.exports = router;
