'use strict';

import React from 'react';


const AccountSettings = function(props) {
  return (
    <div className="account-settings">
      # AccountSettings section
    </div>
  );
};

const AccountSettingsContainer = function(props) {
  return (
    <AccountSettings />
  );
};
AccountSettingsContainer.defaultProps = {};
AccountSettingsContainer.propTypes = {};

export { AccountSettingsContainer as default };