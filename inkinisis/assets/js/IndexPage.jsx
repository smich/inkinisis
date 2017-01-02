'use strict';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import appReducers from './lib/appReducers.js';
import INavBar from './components/NavBar.jsx';


/**
 * Create the redux store and enable Webpack hot module replacement for reducers
 *
 * @param initialState
 * @returns {Store<S>}
 */
const configureStore = function(initialState) {
  const store = createStore(appReducers, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./lib/appReducers.js', () => {
      const nextRootReducer = require('./lib/appReducers.js');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};


/**
 *  Render the top navigation bar and the view of any selected route.
 *
 * @param history
 * @param children
 *
 * @returns {XML}
 * @constructor
 */
const IndexPageLayout = function({children}, {history}) {
  return (
    <div className="clearfix">
      <INavBar history={history} />
      {children}
    </div>
  );
};
IndexPageLayout.contextTypes = {
  history: React.PropTypes.object
};

/**
 * Main application page that wraps the IndexPageLayout
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const IndexPage = function({children}, {initialState}) {
  const store = configureStore(initialState);
  return (
    <Provider store={store}>
      <IndexPageLayout children={children} />
    </Provider>
  );
};
IndexPage.contextTypes = {
  initialState: React.PropTypes.object
};

export default IndexPage;