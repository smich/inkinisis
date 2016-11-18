'use strict';


/**
 * Configure views and view engine using handlebars
 *
 * @param app
 */
function setupViews(app) {

  var // Core modules
    hbs = require('hbs')
    , hbsutils = require('hbs-utils')(hbs)
    , path = require('path')
    ;

  var VIEWS_PATH = __dirname + '/../views';
  var VIEWS_PARTIAL_PATH = VIEWS_PATH + '/../views/';

  // Register and watch partials
  var partials = [
    VIEWS_PARTIAL_PATH,
    path.join(VIEWS_PATH, 'landing', 'partials'),
  ];
  partials.forEach(function(pDir) {
    hbsutils.registerPartials(pDir);
    hbsutils.registerWatchedPartials(pDir);
  });

  // Register handlebars helper functions
  hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
  });
  hbs.registerHelper('if_eq', function(a, b, opts) {
    return (a == b) ? opts.fn(this) : opts.inverse(this);
  });
  hbs.registerHelper('if_not', function(a, opts) {
    return !a ? opts.fn(this) : opts.inverse(this);
  });
  hbs.registerHelper('if_not_eq', function(a, b, opts) {
    return (a != b) ? opts.fn(this) : opts.inverse(this);
  });
  hbs.registerHelper('if_mod_eq_zero', function(a, b, opts) {
    return (a % b == 0) ? opts.fn(this) : opts.inverse(this);
  });
  hbs.registerHelper('apply_div', function(a, b, opts) {
    return parseInt(a) / parseInt(b);
  });
  hbs.registerHelper('faIcon', function(icons) {
    var iconsHtml = '';
    for (var i in icons) {
      iconsHtml += '<i class="fa fa-'+icons[i]+'"></i>';
    }

    return new hbs.SafeString(iconsHtml);
  });

  app.set('views', VIEWS_PATH);
  app.set('view engine', 'hbs');

}

module.exports = setupViews;