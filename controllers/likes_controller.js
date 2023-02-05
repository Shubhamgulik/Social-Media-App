const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req,res){
    // /like/toggle/?id=1231243&type=Post

    try {
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        });
        //If like is already present then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            deleted = true;
            existingLike.remove();
        }else{
        //If like is not present then create it
            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type
            });
            deleted = false;
            likeable.likes.push(newLike);  
            likeable.save();
        }
        // if(deleted == true){
        //     req.flash("success","UnLiked");
        //     // return res.redirect('back');
        // }else{
        //     req.flash("success","Liked");
        //     // return res.redirect('back');

        // }

        return res.status(200).json({
            message : "Request Successful",
            data : {
                deleted : deleted,
            }
        })
    } catch (error) {
        console.log("Error in like controller : ",error);
        return res.status('501').json({
            message : "Unauthorized request",
        })
    }

    
   
}