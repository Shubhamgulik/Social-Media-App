const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt; 
const User = require('../models/user');

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret', // We can pass any key here
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._id, function(err, user) {
        if (err) {
            console.log('Error in finding user from JWT');
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;
