var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  fs.readFile('people.txt', 'utf8', function(err,data){
    var people = data.split('\n');
    res.render('index', {people: people});
  });
});

router.post('/', function(req,res,next){
  if (req.body.name) {
    fs.appendFile('people.txt', req.body.name + '\n', function(err){
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  } else {
    fs.readFile('people.txt', 'utf8', function(err,data){
      var people = data.split('\n');
      res.render('index', {error: 'No name provided', people: people});
    });
  }
});


module.exports = router;
