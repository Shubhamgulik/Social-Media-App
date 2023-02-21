const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use local strategy
passport.use(new googleStrategy({
    clientID : "233022913384-4vbh6h6323f9j02eu4toujhcgm9u09ir.apps.googleusercontent.com",
    clientSecret : "*********************",
    callbackURL : "http://localhost:8000/users/auth/google/callback",
},
    async function(accessToken, refreshToken, profile, done){

        try {
            //checking if user is present in DB
            let user = await User.findOne({email: profile.emails[0].value}).exec();
            console.log("Profile : ",profile);
            //If user is present
            if(user){
                // sign in
                return done(null,user);
            }else{ // If user not present
                //sign up
                
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex'),
                },function(err,user){
                    if(err){console.log("Error in google strategy : ",err); return;}
                    return done(null,user);
                } );

                // user = await User.create({
                //     name : profile.displayName,
                //     email : profile.emails[0].value,
                //     passport : crypto.randomBytes(20).toString('hex'),
                // });
                // return done(null,user);
            }
        } catch (error) {
            console.log('Error in google strategy passport : ',error);
            return 'back';
        }
    }
));

module.exports = passport;
