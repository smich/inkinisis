var watchIgnoreList = [
  "client"
  , "ecosystem.config.js"
  , "package.json"
  , "webpack.config.js"
  , "webpack.config.dev.js"
  , "webpack.config.prod.js"
  , "node_modules"
  , "server/public"
  , "LICENSE"
  , "README.md"
  , ".git"
  , ".gitignore"
];

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // The development environment:
    // - The HRM is activated to hot reload modified react components on the fly
    //   when any js file inside client/ is modified
    // - pm2 reloads any active node processes when server related js code is
    //   modified
    {
      "name": "ikapp-dev"
      , "script": "./server/bin/www"
      , "watch": true
      , "ignore_watch" : watchIgnoreList
      , "watch_options": {
        "followSymlinks": false
      }
      , "env": {
        "NODE_ENV": "development"
      }
    }
    , {
      "name": "ikapp"
      , "script": "./server/bin/www"
      , "exec_mode": "cluster"
      , "instances": 4
      , "env": {
        "NODE_ENV": "production"
      }
    }
  ],
};
