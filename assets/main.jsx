'use strict';

import React from 'react';
import ReactDom from 'react-dom';

import Directions from './js/directions.jsx';
import Test from './js/test.jsx';

import './sass/main.scss'


if (document.getElementById('test')) {
  ReactDom.render(<Test/>, document.getElementById('test'));
}

if (module.hot) {
  module.hot.accept();
}