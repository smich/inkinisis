'use strict';

import path from 'path';
import express from 'express';

import {getView} from '../lib/utils';

const APP_NAME = 'landing';
const router = express.Router();

/**
 * Main landing page
 */
router.get('/', function(req, res, next) {
  res.render(getView(APP_NAME, 'index'), {
    layout: 'layout_landing'
    , title: 'Express'
  });
});

// send all requests to index.html so browserHistory in React Router works
router.get('*', function (req, res, next) {
  res.render(getView(APP_NAME, 'index'), {
    reactHTML: "Da loading..."
  });
});

module.exports = router;
