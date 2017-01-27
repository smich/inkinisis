'use strict';

import path from 'path';

// const ROOT_DIR = './..';

// Define all micro-app names
// @todo: Move this to settings
const APPS = {
  inkinisis: {
    urlBase: "/"
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
    const routePath = path.join(appName, 'routes.js');

    console.log('routePath ::: ');
    console.log(routeUrlBase);
    console.log(appName);
    console.log(routePath);

    app.use(routeUrlBase,
      require.context(
        appName, true, /routes\.js$/
      ));
    // app.use(routeUrlBase, require(`${routePath}`));
    // app.use(routeUrlBase, require("inkinisis/routes.js"));
  });
}

export default registerRoutes;
// module.exports = registerRoutes;
