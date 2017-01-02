'use strict';

import path from 'path';
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { getView } from '../lib/utils';
import iRoutes from './assets/js/lib/iRoutes.jsx';

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

/**
 * Match the rest of the routes  so browserHistory in React Router works
 */
/*router.get('*', function (req, res, next) {
  res.render(getView(APP_NAME, 'index'), {
    reactHTML: "Da loading yo..."//ReactDOMServer.renderToString(TestComponent({}))
  });
});*/

router.get('*', function (req, res, next) {
  match({
    routes: iRoutes
    , location: req.url
  }, (err, redirect, props) => {
    // In here we can make some decisions all at once

    // There was an error somewhere during route matching
    if (err) {
      res.status(500).send(err.message)
    }
    // Before a route is entered - the `onEnter` hook runs on routes -, it can redirect. Here we handle on
    // the server.
    else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    }
    // If we got props then we matched a route and can render
    else if (props) {
      // `RouterContext` is what the `Router` renders. `Router` keeps these
      // `props` in its state as it listens to `browserHistory`. But on the
      // server our app is stateless, so we need to use `match` to
      // get these props before rendering.
      const appHtml = renderToString(<RouterContext {...props}/>)

      console.log('REACT HTML ::: ');
      console.log(appHtml);
      res.render(getView(APP_NAME, 'index'), {
        reactHTML: appHtml
      });
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  });
});

module.exports = router;
