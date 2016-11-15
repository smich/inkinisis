/**
 * Asset bundling process for PRODUCTION environment
 *
 * - transpile jsx to js
 * - compile SASS to CSS,
 * - extract CSS on a separate file
 * - minify all resources
 *
 * @type {ExtractTextPlugin}
 */

var ExtractTextPlugin = require('extract-text-webpack-plugin');


var Config = function(APP_DIR, BUILD_DIR, ENTRY_FILE) {
  return {
    entry: [APP_DIR, ENTRY_FILE].join('/')
    , output: {
      path: BUILD_DIR
      , filename: '[name].js'
    }
    , module: {
      loaders: [
        {
          test: /.jsx?$/
          , loader: 'babel-loader'
          , exclude: /node_modules/
          , query: {
              presets: ['es2015', 'react']
            }
        }
        , {
          test: /\.scss$/
          // Compile SASS to CSS
          , loader: ExtractTextPlugin.extract('css!sass')
        }
      ]

    }
    , plugins: [
        // Extract compiled SASS code to a separate file
        new ExtractTextPlugin('/main.css', {
          allChunks: true
        })
      ]
  };
};


module.exports = Config;