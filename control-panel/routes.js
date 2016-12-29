'use strict';

import path from 'path';
import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {getView} from '../lib/utils';
// import Test from '../assets/js/test.jsx';

const APP_NAME = 'control-panel';
const router = express.Router();
// let TestComponent = React.createFactory(Test);

/**
 *
 */
router.get('/', function(req, res, next) {
  res.render(getView(APP_NAME, 'index'), {
    title: 'User Control Panel'
    , reactHTML: 'react html should go here'//ReactDOMServer.renderToString(TestComponent({}))
  });
});

module.exports = router;
