
const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
// const User = require('../models/user');
const commentMailer = require('../mailers/comment_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_emails_worker');
module.exports.create = async function(req,res){
    
    try { 
        let post = await Post.findById(req.body.post,)
        if(post){
            let comment = await Comment.create({
                        content : req.body.content,
                        post : post._id,
                        user : req.user._id
                    })
        
            post.comments.push(comment);
            
            post.save();
            
            // populating the comment 
            comment = await comment.populate([
                {
                    path : 'user', 
                    select : 'name email',
                }
            ]);
            console.log("Populating comment")
            // commentMailer.newComment(comment);  
            let job = queue.create('emails', comment).save(function(err){
                if(err){console.log("Error in creating job: ",err); return;}

                console.log("Job Enqueued: ",job.id);
                
            });

            if(req.xhr){
                
                
                return res.status(200).json({
                    data : {
                        comment : comment,
                    },
                    message : 'Comment created',
                });
            }
        }
        req.flash('success','Comment added successfully!');
        return res.redirect('/');          

    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }        
}


// Delete a comment

module.exports.destroy = async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id);
        if(req.user.id == comment.user){
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{ $pull : {'comments' : req.params.id}});
            await Like.deleteMany({'likeable' : req.params.id});
            if(req.xhr){
                console.log("Requewst is XHR");
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id,
                    },
                    message : 'Comment Deleted!'
                });
            }
            req.flash('success','Comment deleted!');
        }else{
            req.flash('error','You can not delete comment!');
        }
        return res.redirect('back');  
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
}