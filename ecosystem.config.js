module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // The development environment:
    // - When backend or frontend coee is modified, webpack or the webpack dev server recompiles the codebase and
    //   updates the bundle at public/build/bin/www.entry.js
    // - pm2 reloads any active node processes to catch up with the changes
    {
      "name": "app-dev"
      , "script": "start-server.babel.js"
      , "watch": [
        "public/build"
      ]
      , "watch_options": {
        "followSymlinks": false
      }
      , "env": {
        "NODE_ENV": "development"
      }
    }
    , {
      "name": "app-prod"
      , "script": "./bin/www"
      , "exec_mode": "cluster"
      , "instances": 4
      , "env": {
        "NODE_ENV": "production"
      }
    }
  ],
};
