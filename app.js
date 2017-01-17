var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var login = require('./routes/siteProject/login');
var write = require('./routes/siteProject/board/write');
var list = require('./routes/siteProject/board/list');
var update = require('./routes/siteProject/board/update');
var deletes = require('./routes/siteProject/board/deletes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, function() {
    console.log('listening on port 3000!');
});

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('Connected to mongod server');
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/write', write);
app.use('/list', list);
app.use('/update', update);
app.use('/deletes', deletes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
