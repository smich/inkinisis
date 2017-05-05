/**
 * Asset bundling process for DEVELOPMENT environment
 *
 * - transpile jsx to js
 * - compile SASS to CSS,
 * - add a style tag with all compiled SASS inside the head
 */

var webpack = require('webpack');
var path = require('path');

// project folder
const rootFolder = path.resolve(__dirname, '..');

var buildPath = path.resolve(rootFolder, 'public', 'build');



var config = {
  context: rootFolder
  , entry: [
    // 'webpack/hot/dev-server'
    // , 'webpack-hot-middleware/client'
    // [APP_DIR, ENTRY_FILE].join('/')
    './assets/main.jsx'
  ]
  , devtool: 'source-map'
  , output: {
    // "path" is now "/public"; we're building our app into memory now rather than a build folder
    // "path" is the location where the bundle file is saved
    path: buildPath
    , filename: '[name].js'
    // Used by plugins (e.g file-loader, url-loader) to generate url paths for images, stylesheets etc
    // e.g
    //.image{
    //  background-image: url(./test.png)
    //}
    //.image{
    //  background-image: url(https://inkinisis.dev/some-hash.png)
    //}
    , publicPath: 'http://inkinisis.dev/build/'
  }
  , resolve: {
    modules: [
      path.resolve(rootFolder)
      , 'node_modules'
    ]
    , alias: {
        assets: path.resolve(__dirname, '..', 'assets')
        , inkinisis: path.resolve(__dirname, '..', 'inkinisis')
        , views: path.resolve(__dirname, '..', 'views')
      }
    }
  , module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i
        , use: [
          {
            loader: "url-loader"
            , options: {
              limit: 50000
              , name: '[path][name].[hash].[ext]'
            }
          }
        ]
      }
      , {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/
        , use: "file-loader"
      }
      , {
        test: /.jsx?$/
        , use: [
          // ORDER MATTERS; "react-hot" needs to be on the left, because webpack processes the loaders from right-to-left
          'react-hot-loader'
          // webpack forbids the "loader.query" property when you have multiple loaders; use a queryString to pass those details
          , { loader: 'babel-loader', options: { presets: [ 'es2015', 'react' ] } }
        ]
        , exclude: /node_modules/
      }
      , {
        test: /\.scss$/
        // Compile SASS to CSS
        , use: [
          'style-loader'
          , { loader: 'css-loader', options: { /*modules: true, localIdentName: '[name]__[local]__[hash:base64:5]', importLoaders: 1*/ } }
          , { loader: 'postcss-loader' }
          , { loader: 'sass-loader', options: { includePaths: ['./assets/sass/vendor'] } }
        ]
      }
    ]
  }
  , plugins: [
    // Webpack 2.0 fixed this misspelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    /*new webpack.HotModuleReplacementPlugin()
     , new webpack.NoEmitOnErrorsPlugin()*/
  ]
};


module.exports = config;