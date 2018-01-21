var express = require('express');
var router = express.Router(); 

router.get('/register', function(req, res){
    res.render('register', {
        projectTitle: 'Reiser Muzic',
        pageTitle: 'Register',
        pageId: 'register'
    }); 
})

router.post('/register', function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    console.log(username);
    console.log(email);
    console.log(password);

 var dbConnect = require('../db.js');
})

module.exports = router;