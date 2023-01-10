const express = require('express');
const passport = require('passport');
const router = express.Router();

const profileController = require('../controllers/profile_controller');


router.get('/profile/:id',passport.checkAuthentication ,profileController.profile)

router.get('/signup/',profileController.signup);
router.get('/signin/',profileController.signin);
router.post('/update/:id',passport.checkAuthentication,profileController.update);
router.post('/create' ,profileController.create);

// Use passport as a middleware to authenticate user

router.post('/create-session/', passport.authenticate(
    'local',
    {failureRedirect : '/users/signin/'},
) ,profileController.createSession);

// Destroy session
router.get('/sign-out',profileController.destroySession);

module.exports = router;
