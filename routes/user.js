const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile_controller');


router.get('/',profileController.profile)

router.get('/signup/',profileController.signup);
router.get('/signin/',profileController.signin);

router.post('/create',profileController.create);

module.exports = router;
