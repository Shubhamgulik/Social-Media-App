{

    

    let createComment = function(){
        // console.log("For first comment"); 
        console.log(this);
        let newCommentForm = $('#new-comment-form');
        // -${comment.user._id}
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({ 
                method : "POST",
                url : '/comments/create',
                data : newCommentForm.serialize(),
                success : function(data){
                    console.log(data);
                    let newComment = createCommentDOM(data.data.comment);
                    console.log("In the ajax comment: ",newComment);
                    
                    $('#post-comments-list>ul').prepend(newComment);
                    console.log($(' .comment-delete-button',newComment));
                    deleteComment($(' .comment-delete-button',newComment));
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    let createCommentDOM = function(comment){
        return $(`
            <li id="comment-${comment._id}">                      
                <p>
                    <a class="comment-delete-button" href="/comments/destroy/${comment._id}">X</a>
                    ${comment.content} <br>
                    <small>
                    ${comment.user.name}
                    </small>
                </p>
            </li>
        `);
    } 

    let deleteComment = function(deleteLink){
        console.log("Delete link: ",deleteLink);  
        console.log("URL is : ",$(deleteLink).prop('href'));
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log("Preventing default");
            $.ajax({
                method : 'GET',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    console.log("Preventing default successfully");
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    

    createComment();
}