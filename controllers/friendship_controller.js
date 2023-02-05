const User = require('../models/user');
const Friendship = require('../models/friendship');


module.exports.addFriend = async function(req,res){
    // /friendship/add/?from=1234&to=5678
    let from = req.query.from;
    let to = req.query.to; 

    try {
        
        if(req.user._id == from){
            let friendship = await Friendship.create({from_user : from,to_user: to});
            let from_user = await User.findById(from);
            let to_user = await User.findById(to);
            console.log(from_user ,"  ",to_user)
            console.log()
            from_user.friends.push(to);
            from_user.save();
            to_user.friends.push(from);
            to_user.save();

            req.flash('success','Friend Added');
            return res.status(200).json({
                message : 'Friend successfully added',
                data : {
                    added : true,
                    userId : req.user._id,
                    toId : to,
                }
            })
            // return res.redirect('back');
        }else{
            req.flash('error','Unauthorized access'); 
            return res.redirect('back');
        }

    } catch (error) {
        console.log("Error in adding friend : ",error);
        req.flash('error','Cannot Add friend');
        return;
    }

}

module.exports.removeFriend = async function(req,res){
    try {
        // /friendship/remove/?from=1234&to5678
 
        if(req.user._id == req.query.from){
            let friendship = await Friendship.findOne({from_user : req.query.from});
            if(friendship == null ){
                friendship = await Friendship.findOne({to_user : req.query.from});
            } 
            let from_user = await User.findById(req.query.from);
            let to_user = await User.findById(req.query.to);
            console.log("Getting friendship : ",friendship);
            from_user.friends.pull(req.query.to);
            // await User.findByIdAndUpdate(from_user._id,{$pull : {'friends' : to_user._id}});
            from_user.save();

            to_user.friends.pull(req.query.from);
            // await User.findByIdAndUpdate(to_user.id,{$pull : {'friends' : from_user._id}});
            to_user.save();

            req.flash('success','Friend Removed');
            friendship.remove();
            return res.status(200).json({
                message : 'Friend successfully removed',
                data : {
                    added : false,
                    userId : req.user._id,
                    toId : req.query.to,
                }
            })
            return res.redirect('back');
        }else{
            req.flash('error','Unauthorized access'); 
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error in adding friend : ",error);
        req.flash('error','Cannot remove friend');
        return;
    }
}