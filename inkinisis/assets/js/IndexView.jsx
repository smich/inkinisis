'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'

import appReducers from './lib/appReducers.js';
import iRoutes from './lib/iRoutes.jsx';


/*const initialState = {
  trips: [
    {
      id: 1
      , label: "First trip"
      , likes: 1
    }
    , {
      id: 2
      , label: "Second trip"
      , likes: 2
    }
    , {
      id: 3
      , label: "Third trip"
      , likes: 3
    }
  ]
};*/

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
 * Wrapper component to setup all routes
 *
 * @returns {XML}
 * @constructor
 */
class RouterComponent extends React.Component {
  getChildContext() {
    return {
      history: browserHistory
    }
  }

  render() {
    console.log('IN ROOTTTT COMPONENT');
    console.log(window.__PRELOADED_STATE__);
    const initialState = window.__PRELOADED_STATE__;
    const store = configureStore(initialState);
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={iRoutes}/>
      </Provider>
    )
  }
}
RouterComponent.childContextTypes = {
  history: React.PropTypes.object
};

/**
 * Render the view and wire all routes
 */
const render = () => {
  ReactDom.render(
    <RouterComponent />, $mount
  );
};

const $mount = document.getElementById('site-container');
if ($mount) {
  render();
}
