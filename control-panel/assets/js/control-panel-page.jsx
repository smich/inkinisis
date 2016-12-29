'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory, browserHistory } from 'react-router'

import DashboardContainer from '../../../accounts/assets/js/DashboardContainer.jsx';
import SettingsPage from '../../../settings/assets/js/SettingsPage.jsx';
import AccountSettingsContainer from '../../../settings/assets/js/AccountSettingsContainer.jsx';
import PaymentSettingsContainer from '../../../settings/assets/js/PaymentSettingsContainer.jsx';
import TripListContainer from '../../../trips/assets/js/TripListContainer.jsx';
import TripViewContainer from '../../../trips/assets/js/TripViewContainer.jsx';
import NavBar from './components/NavBar.jsx';


const ControlPanelPage = function(props) {
  return (
    <div className="container container--content">
      <NavBar />
      {props.children}
    </div>
  ) ;
};

const RouterComponent = function() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={ControlPanelPage}>
        <IndexRedirect to="/dashboard"/>
        <Route path="/dashboard" component={DashboardContainer}/>
        <Route path="/settings" component={SettingsPage}>
          <IndexRedirect to="/settings/account"/>
          <Route path="/settings/account" component={AccountSettingsContainer}/>
          <Route path="/settings/payments" component={PaymentSettingsContainer}/>
        </Route>
        <Route path="/trips" component={TripListContainer}/>
        <Route path="/trips/:id" component={TripViewContainer}/>
      </Route>
    </Router>
  )
};

const $mount = document.getElementById('site-container');
const render = () => {
  ReactDom.render(
    <RouterComponent />,
    $mount
  );
};

if ($mount) {
  render();
}

// if (module.hot) {
//   module.hot.accept();
// }