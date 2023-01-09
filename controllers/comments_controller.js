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