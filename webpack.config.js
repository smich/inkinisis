var path = require('path')
  , webpack = require('webpack')
  ;

var APP_DIR = path.resolve(__dirname, 'client')
  , BUILD_DIR = path.resolve(__dirname, 'public')
  , ENTRY_FILE = 'main.jsx'
  , config;


// Production environment
if (process.env.NODE_ENV == 'production') {
  config = require('./webpack.config.prod.js')(APP_DIR, BUILD_DIR, ENTRY_FILE);
}
// Development environment
else {
  config = require('./webpack.config.dev.js')(APP_DIR, BUILD_DIR, ENTRY_FILE);
}

module.exports = config;