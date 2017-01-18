/**
 * Asset bundling process for DEVELOPMENT environment
 *
 * - transpile jsx to js
 * - compile SASS to CSS,
 * - add a style tag with all compiled SASS inside the head
 */

var webpack = require('webpack');
var path = require('path');


var Config = function(APP_DIR, BUILD_DIR, ENTRY_FILE) {
  return {
    entry: [
      'webpack/hot/dev-server'
      , 'webpack-hot-middleware/client'
      , [APP_DIR, ENTRY_FILE].join('/')
    ]
    , devtool: 'source-map'
    , output: {
      // "path" is now "/public"; we're building our app into memory now rather than a build folder
      // "path" is the location where the bundle file is saved
      path: '/public'
      , filename: '[name].js'
      // Used by plubins (e.g file-loader, url-loader) to generate url paths for images, stylesheets etc
      // e.g
      //.image{
      //  background-image: url(./test.png)
      //}
      //.image{
      //  background-image: url(https://inkinisis.dev/some-hash.png)
      //}
      , publicPath: 'https://inkinisis.dev/'
    }
    , plugins: [
      // Webpack 1.0
      new webpack.optimize.OccurenceOrderPlugin(),
      // Webpack 2.0 fixed this misspelling
      // new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
    , resolve: {
      root: [path.resolve('./')],
    }
    , module: {
        loaders: [
          {
            test: /\.(jpe?g|png|gif|svg|ico)$/i
            // , include: 'assets/img/'
            , loader: "file-loader"
            , options: {
              // limit: 50000
              name: '[path][name].[hash].[ext]'
            }
          }
          , {
            test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/
            , loader: "file-loader"
          }
          , {
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
              , loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader']
          }
        ]
    }
    , sassLoader: {
      includePaths: [
        './assets/sass/vendor',
      ],
    }
  };
};


module.exports = Config;