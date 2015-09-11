var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();


app.locals.dsadda = 'My App';


// Database
var mongoose = require ("mongoose");
mongoose.connect('mongodb://localhost/nodeworlddev');


var routes = require('./routes/index');
//admin
var admin = require('./routes/admin/admin');
var adminPost = require('./routes/admin/post');
var adminPage = require('./routes/admin/page');
var adminMenu = require('./routes/admin/menu');
var adminUser = require('./routes/admin/user');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

app.use('/', routes);
app.use('/admin', admin);
app.use('/admin/post', adminPost);
app.use('/admin/page', adminPage);
app.use('/admin/menu', adminMenu);
app.use('/admin/user', adminUser);




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});






module.exports = app;
