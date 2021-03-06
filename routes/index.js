var express = require('express');
var router = express.Router(); 

router.get('/', function(req, res){
    console.log(req.user); //from passport
    console.log(req.isAuthenticated()); //from pasport
    res.render('index', {
        projectTitle: 'Tonal-Solutions',
        pageTitle: 'Home',
        pageId: 'home'
    }); 
})

module.exports = router;