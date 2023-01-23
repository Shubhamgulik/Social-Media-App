const User = require('../../../models/user');
const jwt = require('jsonwebtoken');




module.exports.createSession = async function(req,res){
    try {
        let user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password ){
            return res.status('422').json({
                message : 'User Not found',
            });
        }

            return res.status(200).json({
                message : "Sign in successful, please keep it safe",
                data : {
                    token : jwt.sign(user.toJSON(), 'secret', {expiresIn : '100000'} ),
                }
            })
        
    } catch (error) {
        console.log('********',err)
        return res.status('500').json({
            message : 'Internal Server Error',
        });
    }
}