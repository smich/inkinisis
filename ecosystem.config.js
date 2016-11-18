module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      "name": "ikapp-dev"
      , "script": "./bin/www"
      , "ignore_watch" : ["node_modules", "client", "public"]
      , "watch": ["config", "core", "models", "routes", "views", "app.js"]
      , "watch_options": {
          "followSymlinks": false
        }
      , "env": {
          "NODE_ENV": "development"
        }
    },
    {
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
