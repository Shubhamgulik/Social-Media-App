const express = require('express');
const { authenticate } = require('passport');
const passport = require('passport');
const router = express.Router();

const profileController = require('../controllers/profile_controller');

// const multer = require('multer');

router.get('/profile/:id',passport.checkAuthentication ,profileController.profile)

router.get('/signup/',profileController.signup);
router.get('/signin/',profileController.signin);
router.post('/update/:id',passport.checkAuthentication,profileController.update);
router.post('/create' ,profileController.create);

// Router to add avatar
// const upload = multer({ dest: 'uploads/users/' })
// router.post('/upload-avatar/',upload.single('avatar'),function(req,res){
//     req.file.destination += req.user.id;
//     console.log("Uploaded file is : ", req.file);

//     return res.redirect('back');
// })

// Use passport as a middleware to authenticate user

router.post('/create-session/', passport.authenticate(
    'local',
    {failureRedirect : '/users/signin/'},
) ,profileController.createSession);

// Destroy session
router.get('/sign-out',profileController.destroySession);

// Sign in with google
router.get('/auth/google',passport.authenticate('google', {scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect : '/users/signin/'}), profileController.createSession);

module.exports = router;
