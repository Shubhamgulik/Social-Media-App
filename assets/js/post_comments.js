

    class PostComments{
        // constructor is used to initialize the instance of the class whenever a new instance is created
        constructor(postId){
            this.postId = postId;
            this.postContainer = $(`#post-${postId}`);
            this.newCommentForm = $(`#new-${postId}-comment-form`);
    
            this.createComment(postId);
    
            let self = this;
            // call for all the existing comments
            $(' .delete-comment-button', this.postContainer).each(function(){
                // console.log("Self : ",self," This : ",this );
                self.deleteComment($(this));
            });
        }
    

   createComment(postId){
        // console.log("For first comment"); 
        // console.log(this);
        let pSelf = this;

        // let newCommentForm = $('#new-comment-form');
        // -${comment.user._id}
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            console.log("Pself : ",pSelf , " self : ",self);
            $.ajax({ 
                method : "POST",
                url : '/comments/create',
                data : $(self).serialize(),
                success : function(data){
                    // console.log(data);
                    let newComment = pSelf.createCommentDOM(data.data.comment);
                    // console.log("In the ajax comment: ",newComment);
                    
                    $(`#post-comments-${postId}`).prepend(newComment);
                    new Noty({
                        theme: 'relax',
                        text: "Comment Added",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                    // console.log($(' .comment-delete-button',newComment));
                    pSelf.deleteComment($(' .comment-delete-button',newComment));
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    createCommentDOM(comment){
        return $(`
            <li id="comment-${comment._id}">                      
                <p>
                    <a class="comment-delete-button" href="/comments/destroy/${comment._id}">X</a>
                    ${comment.content} <br>
                    <small>
                    <a href="/likes/toggle/?id=${comment._id}&type=Comment">${comment.likes.length} likes</a> 
                    </small> <br>
                    <small>
                    Posted by : ${comment.user.name}
                    </small>
                </p>
            </li>
        `);
    } 

    deleteComment(deleteLink){
        // console.log("Delete link: ",deleteLink);  
        // console.log("URL is : ",$(deleteLink).prop('href'));
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log("Preventing default");
            $.ajax({
                method : 'GET',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    // console.log("Preventing default successfully");
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    


    // createComment();
}