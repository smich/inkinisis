module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      "name": "ikapp-dev"
      , "script": "./server/bin/www"
      , "watch": true
      , "ignore_watch" : ["node_modules", "client", "server/public"]
      , "watch_options": {
          "followSymlinks": false
        }
      , "env": {
          "NODE_ENV": "development"
        }
    },
    {
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
