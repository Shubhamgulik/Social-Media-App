const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Using passport to authenticate

passport.use(new LocalStrategy(
    {
        usernameField : 'email',
    },
    function(email,password,done){
        // Finding user in the database
        User.findOne({email : email},function(err,user){
            if(err){
                console.log("Error in finding the user ===> passport");
                return done(err);
            }
            if(!user || user.password != password){
                console.log("Invalid username or password");
                return done(null,false);
            }

            return done(null,user);
        })
          
    }
));


// Seriallize user using userid 

passport.serializeUser(function(user,done){
    done(null,user.id);
});

// Deseriallize user using the key in the cookie

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding the user ===> passport");
            return done(err);
        }
        return done(null,user);
    })
})

// Sending data of the current logged in user to the views

//Steps

//1: Check if user is authenticated

passport.checkAuthentication = function(req,res,next){
    //If the user is signed in then pass request to next function (controller's action).
    if(req.isAuthenticated()){
        return next();
    }

    // If the user is not signed in then redirect to sign in page
    console.log("User is not authenticated!")
    return res.redirect('/users/signin/');

}

//2: If user is authenticated then, just send user data to the views

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in users data from session's cookie
        // We are just sending it to locals for the views
        
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;