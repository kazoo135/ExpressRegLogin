var express = require('express');
var router = express.Router(); 

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
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var game_id = gameId(); 
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