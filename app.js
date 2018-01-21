var express = require('express');
var app = express(); 
var mysql = require('mysql');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');

//set variables
app.set('view engine', 'ejs');
app.set('views', 'public/views');
app.set('port', process.env.PORT || 3000);

//use packages and functions
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


// use routes
app.use(require('./routes/index'));
app.use(require('./routes/register'));


app.listen( app.get('port'), function(){
    console.log("listening on port 3000")
})