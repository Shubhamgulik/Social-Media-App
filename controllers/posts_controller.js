const Post = require('../models/post');
const Comment = require('../models/comment')

//Function to create new Post
module.exports.create = async function(req,res){

    try {
        await Post.create({
            content : req.body.content,
            user : req.user._id,
        })
    
        return res.redirect('back');
    } catch (error) {
        console.log("Error in creating post : ",error);
        return;
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
        }

        return res.redirect('back');
    } catch (error) {
        console.log('Error in deleting post: ',error);
        return;
    }
    
}