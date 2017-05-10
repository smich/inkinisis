'use strict';

/**
 * Register the routes path of all micro-apps
 *
 * By convention the path is the following:
 * /<micro-app-name>/routes
 */
function registerRoutes(app) {
  app.use('/', require("core/routes.js"));
}

export default registerRoutes;
