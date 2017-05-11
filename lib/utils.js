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
    throw new Error('Invalid application or view name');
  }

  const modifiedAppName = appName.replace(/[-_]?/g, '');
  return [modifiedAppName, viewName].join('_');
}

export {
  getView as default,
};
