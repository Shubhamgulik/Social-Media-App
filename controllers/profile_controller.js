const User = require("../models/user")


module.exports.profile = function(req,res){

    User.findById(req.params.id, function(err,user){
        if(err){console.log('Not able to find the user');}
        console.log("Debug 1");
        return res.render(
            'profile',
            {
                title : 'Profile Page',
                profile_user : user,
            }
        )

    });

    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,{
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        },function(err,user) {
            if(err){console.log("Not able to find user to update");}
            console.log("Debug 2");
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// Load Sign Up page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/');
    }
    return res.render(
        'signup',
        {
            title : 'Sign Up',
        }
    )
}

// Load Sign In page
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/');
    }

    return res.render(
        'signin',
        {
            title : 'Sign In',
        }
    )
}

// Four Steps of authentication

// 1: Create User (Sign UP) / Get the signUp data
module.exports.create = function(req,res){
    //To-Do-Later

    console.log("In the sign up::",req.body);
    // console.log()
    if(req.body.password != req.body.confirm_password){
        console.log(req.body.password != req.body.confirm_password);
        console.log("Passwords are not matching...")
        return res.redirect('back');
    }
    

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log("Got error");return;}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log("Error in signing up user");return;}

                return res.redirect('/users/signin/');
            })
        }else{
            console.log("User Already Exists.");
            return res.redirect('back');
        }
    })  
}

// 2: Create Session (Sign In)
module.exports.createSession = function(req,res){
    
    return res.redirect('/');
}

// 3: Show details of signed in user on profile page

// 4: Sign out

module.exports.destroySession = function(req,res){

    // This function is made Asynchrous in latest Release.
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
    });

    // req.logout();
    // return res.redirect('/');
}