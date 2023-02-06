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
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user',
            }
        })
        // .populate('comments')
        .populate('likes'); 

        let all_users = await User.find({});
        
        let user = req.user;
        // user = user.populate(,{
        //     path : 'friends',
        //     populate : {
        //         path : 'name'
        //     }
        // });
        if(req.user){
            user = await user.populate('friends');
            // console.log(user);

            
            return res.render(
            'home',
            {
                title : 'Home Page',
                posts : posts,
                me : user,
                all_users : all_users,
            });
        }else{
            return res.render(
                'home',
                {
                    title : 'Home Page',
                    posts : posts,
                    all_users : all_users,
                });
        }
    } catch (error) {
        console.log("Error ",error);
        return;
    }
    
    
    
}

