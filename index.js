const express = require('express');
const app =express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

//Getting db
const db = require('./config/mongoose');
const mongoose = require('mongoose');

// Setting view engine and views
app.set('view engine','ejs');
app.set('views','./views');




// Extacting styles and scripts into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Middlewares

//To parse the cookies in Encoded format
app.use(cookieParser());

// Before loading respective views, we need to render layout
app.use(expressLayouts);

//If request is POST then it is encoded, to read it we use urlencoded
app.use(express.urlencoded()); 

// Using express router
app.use('/',require('./routes'));

// Mentioning the folder path for static files
app.use(express.static('./assets'));



app.listen(port,function(err){
    if(err){
        console.log('Error in creating server');
        return;
    }
    console.log(`Server is up and running on ${port}`);
    return;
});