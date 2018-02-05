var express = require('express');
var router = express.Router(); 
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport');

router.get('/register', function(req, res){
    res.render('register', {
        projectTitle: 'Reiser Muzic',
        pageTitle: 'Register',
        pageId: 'register'
    }); 
});

router.get('/login', function(req, res){

    res.render('login', {
        projectTitle: 'Reiser Muzic',
        pageTitle: 'Login',
        pageId: 'login',
        message: req.flash('loginMessage') // set flash msg as property
    }); 
})

router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy(); 
    res.redirect(302,'/');//redirect back to home page.
})
router.post('/login', passport.authenticate('local',
{ 
    successRedirect: '/profile', 
    failureRedirect: '/login',
    failureFlash: true // set login failure msg true

})//end of authenticate params
);

router.get('/profile', authenticationMiddleware(), function(req, res){

    res.render('profile', {
        projectTitle: 'Reiser Muzic',
        pageTitle: 'Profile',
        pageId: 'profile'
    }); 
})


//testing function for eventual game identification number
var gameId = function(){
    var randId = Math.floor(Math.random()* 10000) + 1;
    console.log(randId);
    return randId 
}
router.post('/register', function(req, res){
    req.checkBody('username', 'Username cannot be empty').notEmpty();
    req.checkBody('username', 'Username must be 4-15 characters long').len(4,15);
    req.checkBody('email', 'The email you entered is invaliid').isEmail();
    req.checkBody('email', 'Email address must be 4-100 characters long').len(4, 100);
    req.checkBody('password', 'Password must be 8-100 characters long').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords must match ').equals(req.body.password);

    req.checkBody('email')
    req.checkBody('password')
    
    const errors = req.validationErrors();

    if(errors){
        console.log(`Errors: ${JSON.stringify(errors)}`);
        res.render('register',{
            projectTitle: 'Reiser Muzic',
            pageTitle:'Registration Error',
            pageId: 'regerror',
            error: errors
        })
    }else{
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const game_id = gameId(); 
        console.log(username);
        console.log(email);
        console.log(password);
    
     var db = require('../db.js');
     bcrypt.hash( password, saltRounds, function(err, hash) {

        db.query('INSERT INTO users (game_id,username,email,password) VALUES (?,?, ?,?)', 
        [game_id, username, email, hash],
         function (error, results, fields) {
           if (error){
               console.log(error.message);
               console.log(error.sqlState);
               throw error;
           }else{
               db.query('SELECT LAST_INSERT_ID() AS user_id', function(err, results, fields){
                    if(error) throw error;

                    const user_id = results[0];
                    console.log(results[0])
                    req.logIn(user_id, function(err){
                        //successful login redirect to home page
                        res.redirect('/');
                        
                    });//end of passport login func
               });//end of SELECT query
           }//end of inner else 
         }); //end of INSERT query 
      });//end of bcrypt

    }// end of outer else
    

})//end of req.post

passport.serializeUser(function(user_id, done) {
        done(null, user_id);
});
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

function authenticationMiddleware(){
    return (req, res, next) => {
        console.log(`
        req.session.passport.user: ${JSON.stringify(req.session.passport)}
        `);

        if(req.isAuthenticated()) {
            return next();
        }else{
            res.redirect(302,'/login');// add flssh() msg
        }   
    }
}

module.exports = router;