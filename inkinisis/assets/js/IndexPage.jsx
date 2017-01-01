'use strict';

import React from 'react';

import INavBar from './components/NavBar.jsx';


/**
 * Presentation component to render the page layout
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const IndexPage = function(props) {
  return (
    <div className="clearfix">
      <INavBar history={props.route.history} />
      {props.children}
    </div>
  ) ;
};

export {IndexPage as default};