// We require mongoose package to connect to mongo db
const mongoose = require('mongoose');

// Connection of NodeJS to localhost
mongoose.connect('mongodb://127.0.0.1:27017/codial_P-n-L_Development');

//Aquiring connection
const db = mongoose.connection;

console.log('Connecting to DB.....');

// On error during connection
db.on('error',console.error.bind(console,"Error connecting to MongoDB :: "));

// Once connection is successful
db.once('open',function(){
    console.log("Connected to Database Successfully::");
})

// Export this to use in other files
module.exports = db;