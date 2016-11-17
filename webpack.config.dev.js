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
    // entry: [APP_DIR, ENTRY_FILE].join('/')
    entry: [
      'webpack/hot/dev-server'
      , 'webpack-hot-middleware/client'
      , [APP_DIR, ENTRY_FILE].join('/')
    ]
    , output: {
        // path: BUILD_DIR
        path: '/'
        , filename: '[name].js'
        // , publicPath: 'http://localhost:3000/'
        , publicPath: 'http://inkinisis.dev/'
      }
    , plugins: [
      // Webpack 1.0
      new webpack.optimize.OccurenceOrderPlugin(),
      // Webpack 2.0 fixed this mispelling
      // new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
    , module: {
        loaders: [
          {
            test: /.jsx?$/
            , exclude: /node_modules/
            // , loader: 'babel-loader'
            // , query: {
            //     presets: ['es2015', 'react']
            //   }
            , loaders: [
                  'react-hot'
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