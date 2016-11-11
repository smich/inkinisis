'use strict';

var promise = require('bluebird')
  , pgPromise = require('pg-promise')
  ;

/**
 * Simple Wrapper to easy DB operation
 *
 * @returns {{}}
 * @constructor
 */
var NBDB = function() {

  var options = {
    promiseLib: promise
  };


  var pgp = pgPromise(options)
    , connectionString = 'postgres://db:5432/inkinisis_db'
    , db = pgp(connectionString)
    ;


  var that = {
    db: db
  };

  // --------------------------------
  // Private functions
  // --------------------------------

  /**
   * Module init function
   */
  var init = function() {
    //that.rdb = rdb = r.db(ConfigServer.rdb.db);
    //that.r = r;
  };

  // --------------------------------
  // Public functions
  // --------------------------------

  /**
   * Get a DB connection and attach it to the req object
   * @param req
   * @param res
   * @param next
   */
  that.getConnection = function(appLocals) {
    return function (req, res, next) {
      if (!req || !res || !next) {
        throw new Error('[NBDB Error] Invoke this function only via the app');
      }
      dbConn().then(function (conn) {
        // Make the DB connection available to the request object
        req._dbConn = conn;
        appLocals._dbConn = conn;
        // Pass the current request to the next middleware
        return next();
      }).catch(function (err) {
        // No DB connection, ann error occurred
        res.status(500).send({
          error: err.message
        });
        // Pass the current request to the next middleware
        return next(err);
      });
    }
  };

  /**
   * Execute a query on the rethinkDB server. The function makes
   * sure it opens a connection with the server and then runs the
   * query. A cb function is provided to close the existing connection.
   *
   * @param cb_fn
   * @param args
   */
  that.dbQ = function(cb_fn, args)
  {
    // Make sure a proper callback function is passed
    if (typeof cb_fn != 'function') {
      throw Error("[NBDB-DBQ ERROR] A callback function is expected to be invoked once the DB connection" +
        "is acquired. The callback function should run a query using the acquired connection");
    }

    // Get a db connection and execute the provided callback
    dbConn().then(function(dbConn) {
      // Pass the db connection as first argument
      args.unshift(dbConn);
      // Pass the cb function that closes the connection as the last argument
      args.push(function(_dbConn) {
        // We are done, close the connection
        _dbConn.close();
      });
      cb_fn(args);
    }, function(err) {
      var errMsg = '[NBDB-DBQ ERROR] '+ err.msg;
      console.log(errMsg);
      throw new Error(errMsg);
    });
  };

  // Initialize the module
  init();

  return that;
};

module.exports = NBDB();