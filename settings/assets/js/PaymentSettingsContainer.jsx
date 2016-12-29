'use strict';

import React from 'react';


const PaymentSettings = function(props) {
  return (
    <div className="payment-settings">
      # PaymentSettings section
    </div>
  );
};

const PaymentSettingsContainer = function(props) {
  return (
    <PaymentSettings />
  );
};
PaymentSettingsContainer.defaultProps = {};
PaymentSettingsContainer.propTypes = {};

export { PaymentSettingsContainer as default };