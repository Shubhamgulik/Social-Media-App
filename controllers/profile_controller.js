const User = require("../models/user")
const path = require('path');
const fs = require('fs');
const Reset = require("../models/reset_password_schema");
const crypto = require('crypto');
const queue = require('../config/kue');
const resetPassMailer = require('../mailers/reset_password_mailer');
const resetPassEmailWorker = require('../workers/resetPass_email_worker');
const Noty = require('noty');
// import Noty from 'noty';
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
    
        if(req.user.id == req.params.id){
            try {
                let user = await User.findById(req.params.id);
                
                User.uploadedAvatar(req,res,function(err){
                    if(err){console.log(err);}
                    
                    user.name = req.body.name
                    user.email = req.body.email
                    user.password = req.body.password 
                    
                    if(req.file){
                        if(user.avatar){
                            let avatarPathFromDB = path.join(__dirname,'..',user.avatar);
                            if(fs.existsSync(avatarPathFromDB)){
                                fs.unlinkSync(avatarPathFromDB);
                            }
                        }
                        user.avatar = User.avatarPath + req.file.filename;
                    }
                    user.save();
                    req.flash('success','Profile pic updated!!!!');
                    return res.redirect('back');
                });
            }
            catch (error) {
                console.log("Not able to find user to update",error);
                return;
            }
            // return res.redirect('back');
        }else{
            req.flash('error','Unauthorized');
            return res.status(401).send('Unauthorized');
        } 
        
    } 
// // Reset password 
// module.exports.resetPassword = function(req,res){
//     console.log("Resetting ", req.user);
// }


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

// Load reset password page
module.exports.resetPassword = async function(req,res){
     
    try {
        let randomString = crypto.randomBytes(20).toString('hex');
        let link = '/users/reset-password?accessToken='+randomString;
        console.log("mail is: ",req.user.email); 
        let token = await Reset.create({
            user : req.user._id,
            accessToken : randomString, 
            isValid : true, 
        });    
        token = await token.populate('user');
        console.log("Token : ",token);

        // let job =  queue.create('reset_pass', token).priority('high').save(function(err){
        //     if(err){console.log("Error in creating job: ",err); return;}
        //     console.log("Job Enqueued: ",job.id);
        // });

        // resetPassMailer.resetPassword(token);
 
        let job = queue.create('reset_pass',token).save(function(err){
            if(err){console.log("Error in creating job: ",err); return;}

                console.log("Job Enqueued: ",job.id); 
        });
         
        req.flash('success',"Check your mail for reset link!!!");
        
        return res.redirect('back');
    } catch (error) {
        console.log("Error in sending link : ",error);
        return;
    }
    
    
}
module.exports.generatePassword = async  function(req,res){
    console.log("Access token is : ",req.query.accessToken);
    let token = await Reset.findOne({'accessToken' : req.query.accessToken});
    
    console.log("Token 2 : ",token);
    
    return res.render('reset_password',{
        title : "Reset Password",
        token : token,
    });
};
module.exports.updatePassword = async function(req,res){
    try {
        let token = await Reset.findOne({'accessToken' : req.body.accessToken});    
        console.log(token.user," ",req.user._id);
        if(token.user == req.user.id){
            token.isValid = false;
            token.save();
            let user = await User.findByIdAndUpdate(token.user,{password : req.body.password});
           
            console.log("Updated user : ",user);
            req.flash('success','Password reset successfully!')
            return res.redirect('/users/profile/'+req.user._id);
        }else{
            console.log("In else part")
            req.flash('error','Unauthorized Access!!');
            return res.status(401).redirect('/');
        }
    } catch (error) {
        console.log("Error in reseting the password : ",error);
        return res.redirect('back');
    }
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