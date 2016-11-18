'use strict';


function setupRoutes(app) {

  var routesDir = './../routes';

  var rIndex = require([routesDir, 'index'].join('/'))
    , rUers = require([routesDir, 'users'].join('/'))
    ;

  app.use('/', rIndex);
  app.use('/users', rUers);

}

module.exports = setupRoutes;
