require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require("./passport")
const db = require('./db/db');
const session = require('express-session')

// Routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var auth = require('./routes/auth')



db.connect()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const whitelistDomain = {
  'http://localhost:8080': true
}

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || whitelistDomain[origin]) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 360000,
    secure: false // no SSL certif for running locally
  }
}));


app.use(passport.initialize())
app.use(passport.session())
app.use('/', indexRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/auth', auth)
// app.use("/profile", passport.authenticate('jwt', { session: false }), secureRoute)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
