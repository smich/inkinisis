var watchIgnoreList = [
  "ecosystem.config.js"
  , "package.json"
  , "webpack.config.js"
  , "webpack.config.dev.js"
  , "webpack.config.prod.js"
  , "node_modules"
  , "public"
  , "LICENSE"
  , "README.md"
  , ".git"
  , ".gitignore"
  , "assets"
  , "views"
  , "*\/assets\/*"
  , "*\/__tests__\/*"
  , "*\/views\/*"
];

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // The development environment:
    // - The HRM is activated to hot reload modified react components on the fly
    //   when any js file inside assets/ is modified
    // - pm2 reloads any active node processes when server related js code is
    //   modified
    {
      "name": "ikapp-dev"
      // , "interpreter": "node_modules/babel-cli/bin/babel-node.js"
      , "script": "start-server.babel.js"
      , "watch": [
      /*  "inkinisis\/!*"
        ,*/ "public"
      ]
      // , "watch": true
      // , "ignore_watch" : watchIgnoreList
      , "watch_options": {
        "followSymlinks": false
      }
      , "env": {
        "NODE_ENV": "development"
      }
    }
    , {
      "name": "ikapp"
      , "script": "./bin/www"
      , "exec_mode": "cluster"
      , "instances": 4
      , "env": {
        "NODE_ENV": "production"
      }
    }
  ],
};
