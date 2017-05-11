import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import setupViews from './config/setupViews';
import registerRoutes from './config/registerRoutes';

const app = express();

// Setup view engine and register the views dir of all micro-apps
setupViews(app);

app.use(favicon(path.join(__dirname, '..', '..', 'public', 'img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// __dirname: /build/bin
app.use(express.static(path.join(__dirname, '../../public/')));

// Set global variables
app.locals.env = app.get('env');

/*
var settings = require('./config/settings.js');
var dbConnString = `${settings.db.protocol}://${settings.db.user}:${settings.db.password}@${settings.db.host}/${settings.db.database}`;
var orm = require('orm');

app.use(orm.express(dbConnString, {
  define: function(db, models, next) {
    models.user = require('./accounts/models/user')(orm, db);
    next();
  }
}));
*/

// Register routes of all micro apps
// require('./config/registerRoutes')(app);
registerRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// My process has received a SIGINT signal
// Meaning PM2 is now trying to stop the process
process.on('SIGINT', () => {
  // @todo: Disconnect from DB
  /*
  setTimeout(function() {
    // 300ms later the process kill it self to allow a restart
    process.exit(0);
  }, 300);
  */
  process.exit(0);
});

module.exports = app;
