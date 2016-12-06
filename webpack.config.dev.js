/**
 * Asset bundling process for DEVELOPMENT environment
 *
 * - transpile jsx to js
 * - compile SASS to CSS,
 * - add a style tag with all compiled SASS inside the head
 *
 * @type {ExtractTextPlugin}
 */

var webpack = require('webpack');


var Config = function(APP_DIR, BUILD_DIR, ENTRY_FILE) {
  return {
    entry: [
      'webpack/hot/dev-server'
      , 'webpack-hot-middleware/client'
      , [APP_DIR, ENTRY_FILE].join('/')
    ]
    , devtool: 'source-map'
    , output: {
      // "path" is now "/" because we're building our app into memory now rather than a build folder
      path: '/'
        , filename: '[name].js'
        , publicPath: 'http://inkinisis.dev/'
      }
    , plugins: [
      // Webpack 1.0
      new webpack.optimize.OccurenceOrderPlugin(),
      // Webpack 2.0 fixed this misspelling
      // new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
    , module: {
        loaders: [
          {
            test: /.jsx?$/
            , exclude: /node_modules/
            , loaders: [
              // ORDER MATTERS; "react-hot" needs to be on the left, because webpack processes the loaders from right-to-left
              'react-hot'
              // webpack forbids the "loader.query" property when you have multiple loaders; use a queryString to pass those details
              , 'babel?presets[]=react,presets[]=es2015'
            ]
          }
          , {
            test: /\.scss$/
              // Compile SASS to CSS
              , loaders: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
    }
  };
};


module.exports = Config;