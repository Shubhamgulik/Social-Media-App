const express = require('express');
const app =express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

// Required for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// Importing libraries for auth using JWT
const passportJWT = require('./config/passport-jwt-strategy');

// Importing google oauth 
const passportGoogle = require('./config/passport-google-oauth2-strategy');
// To store session cookies in persistent storage(mongo store). to avoid clearing cookies every time when server gets restarted
const MongoStore = require('connect-mongo');

//Getting db
const db = require('./config/mongoose');
const mongoose = require('mongoose');

//Getting sass library and setting it up
const sassMiddleware = require('node-sass-middleware')

//Setting up socket library
const http = require('http');
const chatServer = http.createServer(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat socket is listening on port 5000");

//Getting Flash library
const flash = require('connect-flash');
const customFlashMware  = require('./config/flashMiddleware');

app.use(sassMiddleware({
    /* Options */
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// Extacting styles and scripts into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// ========== Middlewares ==============    

//If request is POST then it is encoded, to read it we use urlencoded
app.use(express.urlencoded()); 

//To parse the cookies in Encoded format
app.use(cookieParser());

// Before loading respective views, we need to render layout
app.use(expressLayouts);

// Mentioning the folder path for static files
app.use(express.static('./assets'));

// Setting view engine and views
app.set('view engine','ejs');
app.set('views','./views');

// Using the Express session to create and encrypt cookie
// Mongo store is used to store session cookie in DB
app.use(session({
    name:'codial',
    secret : 'something',
    //When the request is not initiallized / the user is not logged in / Identity is not established on server
    //Then we nedd not to save extra information / data in session cookie
    saveUninitialized : false,
    // When user logged in / Identity is established / Some data is present in sessions cookie
    // we need not to change cookie data OR override data if cookie data is unchanged
    resave : false,
    cookie : {
        maxAge : 1000*60*100,
    },
    store : MongoStore.create(
        {
            // mongooseConnection : db,
            mongoUrl : 'mongodb://127.0.0.1:27017/codial_P-n-L_Development',
            autoRemove : 'disabled',
        },
        function(err){
            console.log(err || 'Connect mongo-db setup is OK!')
        }
    ),
}));


// Using passport to authenticate
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Always use Flash below passport session, Cox it uses session to store flash message
app.use(flash());
app.use(customFlashMware.setFlash);
// Using express router
app.use('/',require('./routes'));

// Make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));






app.listen(port,function(err){
    if(err){
        console.log('Error in creating server');
        return;
    }
    console.log(`Server is up and running on ${port}`);
    return;
});