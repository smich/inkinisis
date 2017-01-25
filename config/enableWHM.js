var webpack = require('webpack')
  , webpackDevMiddleware = require('webpack-dev-middleware')
  , webpackHotMiddleware = require('webpack-hot-middleware')
  , webpackconfig = require('./../webpack/webpack.config.js')
  , webpackcompiler
  ;

/**
 * Enable webpack middleware for hot-reloads in development
 */
function enableWHM(app) {
  // Step 1: Create & configure a webpack compiler
  webpackcompiler = webpack(webpackconfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(webpackDevMiddleware(webpackcompiler, {
    publicPath: webpackconfig.output.publicPath,
    stats: {
      colors: true
      // Reduce the amount of output in the terminal
      , chunks: false
      , 'errors-only': true
    }
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(webpackHotMiddleware(webpackcompiler, {
    log: console.log
    , path: '/__webpack_hmr'
    , heartbeat: 10 * 1000
  }));

  return app;
}

module.exports = enableWHM;