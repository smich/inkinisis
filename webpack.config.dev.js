/**
 * Asset bundling process for DEVELOPMENT environment
 *
 * - transpile jsx to js
 * - compile SASS to CSS,
 * - add a style tag with all compiled SASS inside the head
 *
 * @type {ExtractTextPlugin}
 */


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
              , loaders: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
    }
  };
};


module.exports = Config;