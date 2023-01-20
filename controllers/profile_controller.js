const User = require("../models/user")

//Action to get the user details
module.exports.profile = async function(req,res){
    try {
        let user = await User.findById(req.params.id);

        return res.render(
            'profile',
            {
                title : 'Profile Page',
                profile_user : user,
            }
        )
    } catch (error) {
        console.log("Error ",error);
        return;
    }
}
//Action to update user profile
module.exports.update = async function(req,res){
    try {
        if(req.user.id == req.params.id){
            let user = await User.findById(req.params.id);
            
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log(err);}
                
                user.name = req.body.name
                user.email = req.body.email
                user.password = req.body.password 
                
                if(req.file){
                    user.avatar = User.avatarPath + req.file.filename;
                }
                // console.log(req.file);
                console.log(user.avatar);
                user.save();
                return res.redirect('back');
            })
            // return res.redirect('back');
        }else{
            req.flash('error','Unauthorized');
            return res.status(401).send('Unauthorized');
        }
        
    } catch (error) {
        console.log("Not able to find user to update",error);
        return;
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
module.exports.create = async function(req,res){
   
    try {
        console.log("In the sign up::",req.body);
        // console.log()
        if(req.body.password != req.body.confirm_password){
            console.log(req.body.password != req.body.confirm_password);
            console.log("Passwords are not matching...")
            return res.redirect('back');
        }
        
    
        let user = await User.findOne({email: req.body.email});  
        if(!user){
            await User.create(req.body);
            return res.redirect('/users/signin/');
        }else{
            console.log("User Already Exists.");
            return res.redirect('back');
        }    
    } catch (error) {
        console.log("Error in sign up : ",error);
        return;
    }

}

// 2: Create Session (Sign In)
module.exports.createSession = function(req,res){
    req.flash('success',"Logged in successfully!!");
    return res.redirect('/');
}

// 3: Show details of signed in user on profile page

// 4: Sign out

module.exports.destroySession = function(req,res){
    
    
    // This function is made Asynchrous in latest Release.
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success',"Logged out successfully!!");
        return res.redirect('/');
    });
    
    // req.logout();
    // return res.redirect('/');
}