'use strict';

import React from 'react';

import NavLink from '../../../assets/js/base/NavLink.jsx';

const SettingsNavBarSide = function() {
  return (
    <ul role="nav">
      <li><NavLink to="/settings/account">Account</NavLink></li>
      <li><NavLink to="/settings/payments">Payments</NavLink></li>
    </ul>
  );
};

const SettingsPage = function(props) {
  return (
    <div className="row page page--settings">
      <div className="col-xs-4 page--settings__nav">
        <SettingsNavBarSide />
      </div>
      <div className="col-xs-8 page--settings__content">
        {props.children}
      </div>
    </div>
  );
};

export { SettingsPage as default };