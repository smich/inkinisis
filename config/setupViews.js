'use strict';

// Core modules
const fs = require('fs');
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const path = require('path');

const ROOT_PATH = __dirname + '/..';
const VIEWS_PATH = path.join(ROOT_PATH, 'views');
const VIEWS_PARTIAL_PATH = path.join(VIEWS_PATH, 'partials');

// Define all micro-app names
// @todo: Move this to settings
const APP_NAMES = [
  "inkinisis"
  , "settings"
  , "trips"
];

/**
 * Register handlebars helper functions
 */
function registerHBSHelpers() {
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
}

/**
 * Register the views path of all micro-apps
 *
 * By convention the path is the following:
 * /<micro-app-name>/views
 */
function registerViews(app) {
  let appNames = APP_NAMES;
  let viewsPath = [
    // The main views path
    VIEWS_PATH
  ];

  appNames.forEach(appName => {
    viewsPath.push(path.join(ROOT_PATH, appName, 'views'));
  });

  app.set('views', viewsPath);
  app.set('view engine', 'hbs');
}

/**
 * Register the views partials path of all micro-apps
 *
 * By convention the path is the following:
 * /<micro-app-name>/views/partials
 */
function registerViewsPartials() {

  let appNames = APP_NAMES;

  // Register the main partials path
  hbsutils.registerPartials(VIEWS_PARTIAL_PATH);
  hbsutils.registerWatchedPartials(VIEWS_PARTIAL_PATH);

  // Register the partials path for each micro-app, if a partials dir exists
  appNames.forEach(appName => {
    const partialsPath = path.join(ROOT_PATH, appName, 'views', 'partials');
    if (fs.existsSync(partialsPath)) {
      hbsutils.registerPartials(partialsPath);
      hbsutils.registerWatchedPartials(partialsPath);
    }
  });
}

/**
 * Configure views and view engine using handlebars
 *
 * @param app
 */
function setupViews(app) {
  // Register the views
  registerViews(app);

  // Register and watch partials
  registerViewsPartials();

  // Register handlebars helper functions
  registerHBSHelpers();
}

module.exports = setupViews;