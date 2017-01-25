'use strict';

import React from 'react';


const Dashboard = function(props) {
  return (
    <div className="dashboard">
      # Dashboard section...
    </div>
  );
};

const DashboardContainer = function(props) {
  return (
    <Dashboard />
  );
};
DashboardContainer.defaultProps = {};
DashboardContainer.propTypes = {};

export { DashboardContainer as default };