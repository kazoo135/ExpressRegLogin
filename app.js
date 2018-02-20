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
var LocalStrategy = require('passport-local');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');


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
app.use(flash());
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
    function(req, username, password, done) {
        console.log(username);
        console.log(password);
        const db = require('./db.js');
        db.query('SELECT * FROM users WHERE username = ?',[username],function(error, results, fields){
            //db connection error
            if(error) { done(error); }

            //if results is empty, no match found 
            if(results.length === 0 ){
                   return done(null, error, req.flash('loginMessage','Invalid Username or Password'));//tell user authentification failed username or password mismatch
            }else{
                console.log(results[0].password.toString());
                
                const hash = results[0].password.toString();
    
                bcrypt.compare(password, hash, function(err, response){
                    if(response === true){

                    return done(null, { user_id: results[0].user_id }); //succesful lgoin
                    }else{
                        return done(null, false, req.flash('loginMessage','Invalid Username or Password') );//authentification failed add flash() msg invalid password
                    }
                });//end of bcrypt
            }
    });//end of query
    }
  ));//end of passport.use()

// use routes

//set global var for testing if user is logged in (isAuthenticated())
app.use(function(req, res, next){
    app.locals.isAuthenticated = req.isAuthenticated();
    next();
});
app.use(require('./routes/index'));
app.use(require('./routes/register'));




app.listen( app.get('port'), function(){
    console.log("listening on port 3000")
})