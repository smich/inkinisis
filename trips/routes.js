'use strict';

const express = require('express');
const router = express.Router();

const utils = require("../lib/utils");

const APP_NAME = "trips";


router.get('/book', function(req, res, next) {
  res.render(utils.getView(APP_NAME, 'book'));
});

module.exports = router;
