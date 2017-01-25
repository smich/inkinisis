'use strict';

// Transpile all files with the extensions .es6, .es, .jsx, .js on-the-fly using babel.
// This allows the usage of es6 features/syntax on server-side which makes development easier.
// NOTICE: On production an extra step is required to transpile all code using babel (see package.json scripts).
// @todo - add the following to package.json scripts
// @todo ./server this is the dir that contains all code
// "build-server": "node ./node_modules/babel-cli/bin/babel.js -d ./build ./server -s",
// "lint": "eslint source/ --quiet",
// "debug": "node --debug ./build/index.js",
// "validate": "npm run lint; npm run test && npm outdated --depth 0"
require('babel-register');


// import express from 'express';
// import path from 'path';
// import favicon from 'serve-favicon';
// import logger from 'logger';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

// Setup view engine and register the views dir of all micro-apps
require('./config/setupViews')(app);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/*if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}
else {
  console.log('DEVOLOPMENT ENVIRONMENT ::: Turning on WebPack Middleware...');
  require('./config/enableWHM')(app);
}*/

// Set global variables
app.locals.env = app.get('env');

/*var settings = require('./config/settings.js');
var dbConnString = `${settings.db.protocol}://${settings.db.user}:${settings.db.password}@${settings.db.host}/${settings.db.database}`;
var orm = require('orm');

app.use(orm.express(dbConnString, {
  define: function(db, models, next) {
    models.user = require('./accounts/models/user')(orm, db);
    next();
  }
}));*/

/*console.log('development :: ' + process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
  var router = express.Router();

  console.log('IN DEVELOPMENT ENV');

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  router.get('/build/main.js', function (req, res) {
    console.log('getting the request ::: ');
    console.log(req.path);

    proxy.web(req, res, {
      target: 'http://inkinisis.dev:9090'
    });
  });
}*/

// Register routes of all micro apps
require('./config/registerRoutes')(app);

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

// My process has received a SIGINT signal
// Meaning PM2 is now trying to stop the process
process.on('SIGINT', function() {
  // @todo: Disconnect from DB

  setTimeout(function() {
    // 300ms later the process kill it self to allow a restart
    process.exit(0);
  }, 300);
});

module.exports = app;
