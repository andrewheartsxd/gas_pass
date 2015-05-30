'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var userRoutes = require('./routes/userRoutes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/fartwars_development');

var app = express();
app.set('appSecret', process.env.SECRET || 'ihavegas');
app.use(passport.initialize());
require('./lib/passport_strat')(passport);

var userRouter = express.Router();

userRoutes(userRouter, passport, app.get('appSecret'));

app.use('/api/v1/', userRouter);

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});

