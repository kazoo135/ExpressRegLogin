var express = require('express');
var app = express(); 
var mysql = require('mysql');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//authentication packages
var session = require('express-session');
var passport = require('passport');

//set variables
app.set('view engine', 'ejs');
app.set('views', 'public/views');
app.set('port', process.env.PORT || 3000);

//use packages and functions
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//validator must be directly after body-parser 
app.use(expressValidator());
// initialize express-session
app.use(session({
    secret: 'ngjgppeidmkfkfks',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true}
}))
app.use(passport.initialize());
app.use(passport.session());


// use routes
app.use(require('./routes/index'));
app.use(require('./routes/register'));


app.listen( app.get('port'), function(){
    console.log("listening on port 3000")
})