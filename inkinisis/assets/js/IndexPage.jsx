'use strict';

import React from 'react';

import INavBar from './components/NavBar.jsx';


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
      <INavBar history={history} />
      {children}
    </div>
  );
};
IndexPage.contextTypes = {
  history: React.PropTypes.object
};

export default IndexPage;