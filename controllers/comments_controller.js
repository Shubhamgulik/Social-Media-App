const Comment = require('../models/comment');
const Post = require('../models/post')
// const User = require('../models/user');
module.exports.create = async function(req,res){
    
    try {
        let post = await Post.findById(req.body.post,)
 
        let comment = await Comment.create({
                    content : req.body.content,
                    post : post._id,
                    user : req.user._id
                })
    
        post.comments.push(comment);
        post.save();
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