var createError = require('http-errors');
const jwt = require('jsonwebtoken');
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); //share resources btn front and backend
var bodyParser = require('body-parser');
const errorHandler = require('errorhandler');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/Tasks');
var formsRouter = require('./routes/Forms');
var stationsRouter = require('./routes/Stations');



//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';



var app = express();
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUnitialized: false}))

if(!isProduction) {
  app.use(errorHandler());
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/forms', formsRouter)
app.use('/stations', stationsRouter);


// ERROR HANLERS
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
