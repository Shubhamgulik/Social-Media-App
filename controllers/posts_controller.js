const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = function(req,res){

    Post.create({
        content : req.body.content,
        user : req.user._id,
    },function(err,post){
        if(err){ console.log("Error in posting.");}

        console.log(post);
        return res.redirect('back');
    })
}


// Function to delete post which receive post_id as parameter
module.exports.destroy = function(req,res){

    console.log("Deleting post : ",req.params.id);
    //If post exists then only we can delete
    Post.findById(req.params.id, function(err,post){
        if(err){console.log("Not able to find post: ",err);}
        if(post){
            // We'll check if the user is authorised to delete post
            if(post.user == req.user.id){
                post.remove();

                Comment.deleteMany({'post' : req.params.id}, function(err){
                    if(err){console.log("Error in finding posts");}

                    return res.redirect('back');
                });
            }

        }else{
            return res.redirect('back');
        }
    })
}