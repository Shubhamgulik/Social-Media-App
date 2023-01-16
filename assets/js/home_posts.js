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
                    console.log(data);
                    let newPost = createPostDOM(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
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

    

    createPost();
}