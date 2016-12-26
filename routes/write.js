var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Board = require('./board');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('write');
});

router.post('/', function (req, res) {
  var board = new Board();
  board.title = req.body.title;
  board.name = req.body.name;
  board.password = req.body.password;
  board.contents = req.body.contents;

  board.save(function (err) {
    if(err) {
      console.error(err);
      res.json({result: 0});
      return;
    }
    res.redirect('/');
  });
});

module.exports = router;
