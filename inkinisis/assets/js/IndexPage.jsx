'use strict';

import React from 'react';

import INavBar from './components/NavBar.jsx';

console.log('__dirname');
console.log(__dirname);
// import myimg from 'img/logo.png';

const myimg = '#';


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
  history: React.PropTypes.object
};

export default IndexPage;