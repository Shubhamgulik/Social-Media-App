const mongoose = require('mongoose');

console.log("In the user schema!!")
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    }
},{
    timestamps : true
});

// Keep in mind to use comma, we dont have to create object
const User = mongoose.model('User',userSchema);

module.exports = User;