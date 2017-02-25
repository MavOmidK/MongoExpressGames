let express = require('express');
let path = require('path'); // part of node.js core
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// modules for authentication
let session = require("express-session");
let pasport = require("passport");
let passportLocal = require("passport-local");
let LocalStrategy = passportLocal.Strategy;
let flash = require("connect-flash");

// import "mongoose"
let mongoose = require('mongoose');

let config = require('./config/db');

//let URI = config.URI;

// Connects to the mongo DB using the URI above. 
// If on heroku and URI available use, or use local URI
mongoose.connect(process.env.URI || config.URI);

// create a db OBJECT and make a reference to the connection 
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB...");
});

// the inedex.js thats inside my routes folder
let index = require('./routes/index');
let games = require('./routes/games');

// express app
let app = express();

//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

app.use('/', index);
app.use('/games', games);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
