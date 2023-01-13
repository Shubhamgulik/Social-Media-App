const User = require("../models/user");
const Post =require("../models/post");

// module.exports.home = function(req,res){

//     // Method 1

//     // Populating the user with each post 
//     Post.find({})
//     .populate('user')
//     .populate({
//         path : 'comments',
//         populate : {
//             path : 'user',
//         }
//     })
//     .exec(function(err,data){
//         if(err){console.log("Error in getting data");}
     
//         User.find( {},function(err,users){
//             if(err){console.log("Error in getting list of users");}
            
//             return res.render(
//                 'home',
//                 {
//                     title : 'Home Page',
//                     posts : data,
//                     all_users : users,
//                 }
//             )

//         })
        
        
//     });
// }

    // Method 2:
module.exports.home = async function(req,res){

    try {
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user',
            }
        });

        let users = await User.find({});

        return res.render(
        'home',
        {
            title : 'Home Page',
            posts : posts,
            all_users : users,
        });
    } catch (error) {
        console.log("Error ",error);
        return;
    }
    
    
    
}

