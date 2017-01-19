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

var ExtractTextPlugin = require('extract-text-webpack-plugin')
  , webpack = require('webpack')
  , path = require('path');


var Config = function(APP_DIR, BUILD_DIR, ENTRY_FILE) {
  return {
    entry: [APP_DIR, ENTRY_FILE].join('/')
    , output: {
      path: BUILD_DIR
      , filename: '[name].js'
    }
    , resolve: {
      modules: [
        path.resolve('./assets')
        , 'node_modules'
      ],
    }
    , module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i
          , use: "file-loader"
          , options: {
            // limit: 50000
            name: '[path][name].[hash].[ext]'
          }
        }
        , {
          test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/
          , use: "file-loader"
        }
        , {
          test: /.jsx?$/
          , use: [
            { loader: 'babel', options: { presets: [ 'es2015', 'react' ] } }
          ]
          , exclude: /node_modules/
        }
        , {
          test: /\.scss$/
          // Compile SASS to CSS
          , loader: ExtractTextPlugin.extract({
            fallbackLoader: { loader: 'style-loader' }
            , loader: [
              // { loader: 'style-loader' }
              { loader: 'css-loader' }
              , { loader: 'postcss-loader' }
              , { loader: 'sass-loader', query: { includePaths: ['./assets/sass/vendor'] } }
            ]
          })
        }
      ]

    }
    , plugins: [
      // Extract compiled SASS code to a separate file
      new ExtractTextPlugin({
        filename: '/main.css'
        , allChunks: true
      })
      // Use a production ready minified React code
      , new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
      , new webpack.optimize.UglifyJsPlugin()
    ]
  };
};


module.exports = Config;