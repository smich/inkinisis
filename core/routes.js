'use strict';


function setupRoutes(app) {

  var rootDir = './..';
  var routesDir = './../routes';

  var rIndex = require([routesDir, 'index'].join('/'))
    , rUsers = require([routesDir, 'users'].join('/'))
    , rTrips = require([rootDir, 'trips', 'routes'].join('/'))
    ;

  app.use('/', rIndex);
  app.use('/users', rUsers);
  app.use('/trips', rTrips);

}

module.exports = setupRoutes;
