'use strict';

var express = require('express')
  , path = require('path')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  ;

var app = express();

// Setup view engine
require('./core/views')(app);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  console.log('DEVOLOPMENT ENVIRONMENT ::: Turning on WebPack Middleware...');
  require('./config/dev').useWebpackMiddleware(app);
}
else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Set global variables
app.locals.env = app.get('env');

/*var settings = require('./config/settings.js');
var dbConnString = `${settings.db.protocol}://${settings.db.user}:${settings.db.password}@${settings.db.host}/${settings.db.database}`;
var orm = require('orm');

app.use(orm.express(dbConnString, {
  define: function(db, models, next) {
    models.user = require('./models/user')(orm, db);
    next();
  }
}));*/

// Setup routes
require('./core/routes')(app);

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
