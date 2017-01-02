'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router'

import iRoutes from './lib/iRoutes.jsx';


const initialState = {
  trips: [
    {
      id: 1
      , label: "First trip"
      , likes: 1
    }
    , {
      id: 2
      , label: "Second trip"
      , likes: 2
    }
    , {
      id: 3
      , label: "Third trip"
      , likes: 3
    }
  ]
};

/**
 * Wrapper component to setup all routes
 *
 * @returns {XML}
 * @constructor
 */
class RouterComponent extends React.Component {
  getChildContext() {
    return {
      history: browserHistory
      , initialState: initialState
    }
  }

  render() {
    return (
      <Router history={browserHistory} routes={iRoutes}/>
    )
  }
}
RouterComponent.childContextTypes = {
  history: React.PropTypes.object
  , initialState: React.PropTypes.object
};

/**
 * Render the view and wire all routes
 */
const render = () => {
  ReactDom.render(
    <RouterComponent />, $mount
  );
};

const $mount = document.getElementById('site-container');
if ($mount) {
  render();
}
