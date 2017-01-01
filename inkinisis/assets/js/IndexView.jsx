'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import appReducers from './lib/appReducers.js';
import IndexPage from './IndexPage.jsx';
import DashboardContainer from '../../../accounts/assets/js/DashboardContainer.jsx';
import SettingsPage from '../../../settings/assets/js/SettingsPage.jsx';
import AccountSettingsContainer from '../../../settings/assets/js/AccountSettingsContainer.jsx';
import PaymentSettingsContainer from '../../../settings/assets/js/PaymentSettingsContainer.jsx';
import TripListContainer from '../../../trips/assets/js/TripListContainer.jsx';
import TripViewContainer from '../../../trips/assets/js/TripViewContainer.jsx';
import Directions from '../../../trips/assets/js/directions.jsx';


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

const IndexPageWrapper = function(props) {
  const initialState = {
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
  };
  const store = configureStore(initialState);
  return (
    <Provider store={store}>
      <IndexPage history={props.route.history} children={props.children} />
    </Provider>
  );
};

/**
 * Wrapper component to setup all routes
 *
 * @returns {XML}
 * @constructor
 */
const RouterComponent = function() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={IndexPageWrapper} history={browserHistory}>
        <IndexRedirect to="/dashboard"/>
        <Route path="/dashboard" component={DashboardContainer}/>
        <Route path="/settings" component={SettingsPage}>
          <IndexRedirect to="/settings/account"/>
          <Route path="/settings/account" component={AccountSettingsContainer}/>
          <Route path="/settings/payments" component={PaymentSettingsContainer}/>
        </Route>
        <Route path="/trips" component={TripListContainer}/>
        <Route path="/trips/book" component={Directions}/>
        <Route path="/trips/:id" component={TripViewContainer}/>
      </Route>
    </Router>
  )
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
