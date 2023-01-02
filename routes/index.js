const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');
// const profileController = require('../controllers/profile_controller');



console.log("Router Loaded Successfully!!!!")
router.get('/',homeController.home);

router.use('/users',require('./user'))



module.exports = router;
