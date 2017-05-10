'use strict';

/**
 * Busy wait until the bundle expected by the app is ready
 *
 * Once this script returns, pm2 will start the app server
 */

var fs = require('fs');
var path = require('path');

var start = new Date()
  , end
  , duration;
var preamble = '[sleep #' + process.pid + '] ';
var bundlePath = path.resolve(__dirname, 'build', 'bin', 'www.entry.js');


console.log(preamble + 'waiting for "' + bundlePath + '" to be build by webpack...');

var interval = setInterval(function() {
  if (fs.existsSync(bundlePath)) {
    clearInterval(interval);
    end = new Date();
    duration = (end.getTime() - start.getTime()) / 1000;
    console.log(preamble + 'woken up after ' + duration + ' secs');

    process.exit(0);
  }
}, 1000);