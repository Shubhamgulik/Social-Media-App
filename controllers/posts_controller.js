const Post = require('../models/post');
const Comment = require('../models/comment')

//Function to create new Post
module.exports.create = async function(req,res){

    try {
        await Post.create({
            content : req.body.content,
            user : req.user._id,
        })
        req.flash('success','Post published!')
        return res.redirect('back');
    } catch (error) {
        req.flash('error',error)
        return res.redirect('back');
    }
    
}


// Function to delete post which receive post_id as parameter
module.exports.destroy = async function(req,res){

    try {
        console.log("Deleting post : ",req.params.id);
        //If post exists then only we can delete
        let post = await Post.findById(req.params.id);

        // We'll check if the user is authorised to delete post
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({'post' : req.params.id});
            req.flash('success','Post deleted!')
        }else{
            req.flash('error','You cannot delete this post!')
        }
        

        return res.redirect('back');
    } catch (error) {
        req.flash('error',error)
        return res.redirect('back');
    }
    
}