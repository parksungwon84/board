var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema({
  title: String,
  name: String,
  date: {
    type: Date,
    default: Date.now
  },
  password: String,
  contents: String,
  comments: Array
});

module.exports = mongoose.model('board', boardSchema);
