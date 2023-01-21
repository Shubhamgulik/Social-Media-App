const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){

    
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user',
        }
    });
    return res.status(200).json({
        message : 'List of posts',
        posts : posts,
    }) 
}

module.exports.destroy = async function(req,res){

    try {
        console.log("Deleting post : ",req.params.id);
        //If post exists then only we can delete
        let post = await Post.findById(req.params.id);

        post.remove();
                
        await Comment.deleteMany({'post' : req.params.id});        
        return res.status(200).json({
            message : 'Post and comments deleted',
        });

    } catch (error) {
       console.log('********',err)
        return res.status('500').json({
            message : 'Internal Server Error',
        });
    }
    
}