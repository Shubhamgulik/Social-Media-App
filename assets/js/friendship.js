{
    let friend = $('#friend');
    // console.log(friend)
    let ajaxFriend = function(e){
        e.preventDefault();
        let target = e.target;
        // console.log($(target).prop('href'));
        $.ajax({
            method : 'GET',
            url : $(target).prop('href'),
            success: function(data){
                if(data.data.added){
                    // console.log("In added")
                    $(target).prop('href',`/friendship/remove/?from=${data.data.userId}&to=${data.data.toId}`);
                    $(target).html("Remove Friend");
                    // console.log("Complete 1");
                    new Noty({
                        theme: 'relax',
                        text: "Friend Added",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }else{
                    // console.log("In romoved")
                    $(target).prop('href',`/friendship/add/?from=${data.data.userId}&to=${data.data.toId}`);
                    $(target).html("Add Friend");
                    // console.log("Complete 2");
                    new Noty({
                        theme: 'relax',
                        text: "Friend Removed",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }
                // console.log(data);
            },
            error : function(error){
                console.log(error);
            }
        })
    }

    friend.click(ajaxFriend);
    

}