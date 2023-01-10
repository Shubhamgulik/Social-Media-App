const Comment = require('../models/comment');
const Post = require('../models/post')
// const User = require('../models/user');
module.exports.create = function(req,res){
    
    Post.findById(req.body.post,function(err,post){
        if(err){console.log("Error in finding post wrt comment");}

        if(post){
            Comment.create({
                content : req.body.content,
                post : post._id,
                user : req.user._id
            },function(err,comment){
                if(err){console.log("Error in adding comment to DB");}

                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            })
        }
    })
}


// Delete a comment

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(req.user.id == comment.user){
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId,{ $pull : {'comments' : req.params.id}} ,function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}