var express = require('express');
var app = express(); 
var mysql = require('mysql');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//authentication packages
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
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
var options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME    
}

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'ngjgppeidmkfkfks',
    resave: false,
    store: sessionStore,
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