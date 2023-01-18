const Post = require('../models/post');
const Comment = require('../models/comment')

//Function to create new Post
module.exports.create = async function(req,res){

    try {
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id,
        });

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : post,
                },
                message : 'Post created!'
            });
        }

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
                
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id,
                    },
                    message : "Post Deleted!",
                })
            }   

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