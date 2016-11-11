'use strict';

var path = require('path');

var settings = {
  path: path.normalize(path.join(__dirname, '..')),
  port: process.env.NODE_PORT || 3000,
  db: {
    protocol: "postgresql",
    query: { pool: true },
    host: "db",
    database: "inkinisis_db",
    user: "inkinisis",
    password: "1k1n1s1sRulz"
  }
};

module.exports = settings;
