var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Board = require('./board');

/* GET users listing. */
router.get('/:_id', function(req, res, next) {
  var _id = req.params._id;
  res.render('update', {
    _id: _id
  });
});

router.post('/', function (req, res) {
  Board.findById(req.body._id, function(err, board){
        if(req.body.title) {
          board.title = req.body.title;
        }
        if(req.body.name) {
          board.name = req.body.name;
        }
        if(req.body.password) {
          board.password = req.body.password;
        }
        if(req.body.contents) {
          board.contents = req.body.contents;
        }

        board.save(function(err) {
            res.redirect('/');
        });
    });
});

module.exports = router;
