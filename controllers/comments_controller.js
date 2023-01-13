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
        return res.redirect('/');          

    } catch (error) {
        console.log("Error in creating comment : ",error);
        return;
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
        }
        return res.redirect('back');  
    } catch (error) {
        console.log("Error in deleting comment : ",error);
        return;
    }
}