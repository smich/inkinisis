'use strict';

const express = require('express');
const router = express.Router();

const utils = require('../lib/utils');

const APP_NAME = 'landing';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(utils.getView(APP_NAME, 'index'), {
    title: 'Express'
  });
});

module.exports = router;
