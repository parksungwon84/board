var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('siteProject/login');
});

router.post('/', function (req, res) {

});

module.exports = router;
