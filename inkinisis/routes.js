'use strict';

import path from 'path';
import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {getView} from '../lib/utils';
// import Test from '../assets/js/test.jsx';

const APP_NAME = 'inkinisis';
const router = express.Router();

/**
 * Main landing page
 */
router.get('/', function(req, res, next) {
  res.render(getView(APP_NAME, 'landing'), {
    layout: 'layout_landing'
    , title: 'Express'
  });
});

// send all requests to index.html so browserHistory in React Router works
router.get('*', function (req, res, next) {
  res.render(getView(APP_NAME, 'index'), {
    reactHTML: "Da loading yo..."//ReactDOMServer.renderToString(TestComponent({}))
  });
});

module.exports = router;
