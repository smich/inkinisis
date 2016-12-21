'use strict';

/**
 * Return a requested view from a micro-app
 *
 * In each micro app the view files are named using the following format: `<appName>_<viewName>`
 *
 * @param appName
 * @param viewName
 * @returns {string}
 */
function getView(appName, viewName) {
  if (!appName || !viewName) {
    throw "Invalid application or view name";
  }
  return [appName, viewName].join('_')
}

module.exports = {
  getView: getView
};