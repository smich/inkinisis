'use strict';

import path from 'path';
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { match, RouterContext } from 'react-router';

import { getView } from '../lib/utils';
import appReducers from './assets/js/lib/appReducers.js';
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
      /*const initialState = {
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
      };*/
      // `RouterContext` is what the `Router` renders. `Router` keeps these
      // `props` in its state as it listens to `browserHistory`. But on the
      // server our app is stateless, so we need to use `match` to
      // get these props before rendering.
      const store = createStore(appReducers);
      const appHtml = renderToString(
        <Provider store={store}>
          <RouterContext {...props}/>
        </Provider>
      );

      const preloadedState = store.getState();
      console.log('REACT HTML ::: ');
      console.log(appHtml);
      res.render(getView(APP_NAME, 'index'), {
        preloadedState: JSON.stringify(preloadedState)
        , reactHTML: appHtml
      });
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  });
});

module.exports = router;
