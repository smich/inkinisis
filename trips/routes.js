'use strict';

const express = require('express');
const router = express.Router();

router.get('/book', function(req, res, next) {
  res.render('trips_book');
});

module.exports = router;