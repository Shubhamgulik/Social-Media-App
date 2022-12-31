const express = require('express');
const app =express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

// Setting view engine and views
app.set('view engine','ejs');
app.set('views','./views');


app.use(expressLayouts)

// Extacting styles and scripts into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Middlewares
// Using express router
app.use(expressLayouts);
app.use(express.urlencoded());
app.use('/',require('./routes'));
app.use(express.static('./assets'));



app.listen(port,function(err){
    if(err){
        console.log('Error in creating server');
        return;
    }
    console.log(`Server is up and running on ${port}`);
    return;
});