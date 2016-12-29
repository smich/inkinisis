'use strict';

import path from 'path';

const ROOT_DIR = './..';

// Define all micro-app names
// @todo: Move this to settings
const APPS = {
  "control-panel": {
    urlBase: "/cp"
  }
  , landing: {
    urlBase: "/"
  }
  , trips: {
    urlBase: "/trips"
  }
};

/**
 * Register the routes path of all micro-apps
 *
 * By convention the path is the following:
 * /<micro-app-name>/routes
 */
function registerRoutes(app) {
  Object.keys(APPS).forEach(appName => {
    const routeUrlBase = APPS[appName].urlBase;
    const routePath = path.join(ROOT_DIR, appName, 'routes');

    app.use(routeUrlBase, require(routePath));
  });
}

module.exports = registerRoutes;
