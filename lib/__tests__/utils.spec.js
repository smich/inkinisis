'use strict';

const {getView} = require('../utils.js');


describe('getView', () => {
  const appName = "home";
  const viewName = "index";

  const getViewNoAppName = () => {
    getView(null, viewName);
  };

  const getViewNoViewName = () => {
    getView(appName);
  };

  it('throws an error when no appName OR viewName are provided', () => {
    expect(getViewNoAppName).toThrow();
    expect(getViewNoViewName).toThrow();
  });

  it('returns the view name', () => {
    expect(getView(appName, viewName)).toEqual([appName, viewName].join('_'));
  });
});
