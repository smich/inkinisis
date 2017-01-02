'use strict';

import React from 'react';
import { Route, IndexRedirect } from 'react-router'

import IndexPage from './../IndexPage.jsx';
import DashboardContainer from '../../../../accounts/assets/js/DashboardContainer.jsx';
import SettingsPage from '../../../../settings/assets/js/SettingsPage.jsx';
import AccountSettingsContainer from '../../../../settings/assets/js/AccountSettingsContainer.jsx';
import PaymentSettingsContainer from '../../../../settings/assets/js/PaymentSettingsContainer.jsx';
import TripListContainer from '../../../../trips/assets/js/TripListContainer.jsx';
import TripViewContainer from '../../../../trips/assets/js/TripViewContainer.jsx';
import Directions from '../../../../trips/assets/js/directions.jsx';


const iRoutes = (
  <Route path="/"
         component={IndexPage}>
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
);

export default iRoutes;