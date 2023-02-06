{      
    let allItems = $('.toggle-like-button');

    let updateLike = function(e){
        e.preventDefault();
        let target = e.target;
        console.log("Event ",$(target).prop('href'));
        
        // console.log("InnerHtml ",$(target).html());

        // console.log("Total likes: ",$(target).data('likes'));
        let totalLikes = $(target).data('likes');
        console.log("Total likes: ",totalLikes);
        $.ajax({
            method : 'GET',
            url : $(e.target).prop('href'),
            success : function(data){
                console.log("Deleted : ",data.data.deleted);
                if(data.data.deleted){
                    totalLikes -= 1;
                    // console.log(totalLikes);
                    $(target).data('likes',totalLikes);
                    $(target).html(`${totalLikes} likes`);
                    new Noty({
                        theme: 'relax',
                        text: "Disliked",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }else{
                    totalLikes += 1;
                    // console.log(totalLikes);
                    
                    $(target).data('likes' , totalLikes);

                    $(target).html(`${totalLikes} likes`);
                    new Noty({
                        theme: 'relax',
                        text: "Liked",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }
                console.log("Total likes after : ",totalLikes);
                // return res.redirect('back');
            },
            error : function(error){
                console.log("Error: ",error.responseText);
                // return res.redirect('back');
            }
        });
    }



    function convertLikesToAjax(){
        for(let i=0; i<allItems.length; i++){
            allItems[i].addEventListener('click',updateLike);
        }
        console.log("Successfully added event listeners to likes,")
    }

    convertLikesToAjax(); 
}