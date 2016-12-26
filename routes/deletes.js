var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Board = require('./board');

/* GET users listing. */
router.get('/:_id', function(req, res, next) {
  Board.remove({ _id: req.params._id }, function(err, output){
      res.redirect('/list/1');
  });
});

module.exports = router;
