const User = require("../models/user");
const Post =require("../models/post");

module.exports.home = function(req,res){
    // Post.find({},function(err,data){
    //     if(err){console.log("Error in getting data");}

    //     console.log("Here it is: ",data[0].content);  
        
    //     return res.render(
    //         'home',
    //         {
    //             title : 'Home Page',
    //             posts : data,
    //         }
    //     )
    // });

    // Populating the user with each post 
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user',
        }
    })
    .exec(function(err,data){
        if(err){console.log("Error in getting data");}

        console.log("Here it is: ",data[0].content);  
        
        return res.render(
            'home',
            {
                title : 'Home Page',
                posts : data,
            }
        )
    });
    
    
}

