var express = require('express');
var router = express.Router(); 
var expressValidator = require('express-validator');

router.get('/register', function(req, res){
    res.render('register', {
        projectTitle: 'Reiser Muzic',
        pageTitle: 'Register',
        pageId: 'register'
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

    req.checkBody('email')
    req.checkBody('password')
    
    const errors = req.validationErrors();

    if(errors){
        console.log(`Errors: ${JSON.stringify(errors)}`);
        res.render('register',{
            projectTitle: 'Reiser Muzic',
            pageTitle:'Registration Error',
            pageId: 'regerror'
        })
    }
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const game_id = gameId(); 
    console.log(username);
    console.log(email);
    console.log(password);

 var db = require('../db.js');

 db.query('INSERT INTO users (game_id,username,email,password) VALUES (?,?, ?,?)', 
 [game_id, username, email, password],
  function (error, results, fields) {
    if (error){
        console.log(error.message);
        console.log(error.sqlState);
        throw error;
    }else{
        res.render('register',{
            projectTitle: 'Reiser Muzic',
            pageTitle:'Registration complete',
            pageId: 'regcomplete'
        })
    } 
   
  });

})

module.exports = router;