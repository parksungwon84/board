var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Board = require('./board');

/* GET home page. */
router.get('/:page', function(req, res, next) {
  var cnt;
  var page = Number(req.params.page);

  Board.find().count(function (err, count) {
    if (err) {
      console.log(err);
    }
    cnt = Number(count);
    var size = 15; // 보여줄 글의 수
    var totalPage = Math.ceil(cnt / size);

    if (page < 1) {
      page = 1;
    }
    if (page >= totalPage || page < 1) {
        page = totalPage;
    }

    var begin = (page - 1) * size; // 시작 글
    if (begin < 0) {
        begin = 0;
    }
    var pageSize = 10; // 링크 갯수
    var startPage = Math.floor((page - 1) / pageSize) * pageSize + 1;
    var endPage = startPage + (pageSize - 1);

    if (endPage > totalPage) {
        endPage = totalPage;
    }

    var max = cnt - ((page - 1) * size);
    Board.find().skip(size * (page - 1)).limit(size).sort({date: -1}).exec(function (err, rows) {
      console.log('rows : ', rows);
      res.render('list', {
        rows: rows,
        page: page,
        pageSize: pageSize,
        startPage: startPage,
        endPage: endPage,
        totalPage: totalPage,
        max: max
      });
    });
  });
});

module.exports = router;
