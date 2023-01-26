{
    //Submit form using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        // console.log(newPostForm);
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                method : 'POST',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    console.log("In the ajax post: ",data);
                    
                    let newPost = createPostDOM(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    console.log($(' .post-delete-button', newPost));
                    deletePost($(' .post-delete-button', newPost));
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

   

    //Create POST in DOM
    let createPostDOM = function(post){
        return $(`
        <li id="post-${post._id}"> 
            <p>
                
                <a class="post-delete-button" href="/posts/destroy/${post._id}">X</a>
                
                ${post.content} 
                <br>
                <span>Posted by: ${post.user.name} </span>
                <br>
                <div id="post-comments" >
                    
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Add a comment" required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
                   
                    
                    <div id="post-comments-list">
                        <ul id="post-comments-${post._id}" >
                            
                        </ul>
                    </div>
                </div>
                    
            </p>
        </li>
        `)
    }

    //Method to delete the post
    let deletePost = function(deleteLink){
        console.log("In the AJAx: ",deleteLink);
        console.log("URL is : ", $(deleteLink).prop('href'))
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                method : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    console.log(data);
                    console.log("In success function");
                    $(`#post-${data.data.post_id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            console.log(self);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


    createPost();
    convertPostsToAjax();

}