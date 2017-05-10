'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import INavBar from './components/NavBar.jsx';

import myimg from 'assets/img/logo.png';


/**
 *  Render the top navigation bar and the view of any selected route.
 *
 * @param history
 * @param children
 *
 * @returns {XML}
 * @constructor
 */
const IndexPage = function({children}, {history}) {
  return (
    <div className="clearfix">
      <img src={myimg} title="Loading..." id="test-img"/>
      <INavBar history={history} />
      {children}
    </div>
  );
};
IndexPage.contextTypes = {
  history: PropTypes.object
};

export default IndexPage;