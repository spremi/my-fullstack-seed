/*
 * Entry point for the server application.
 *
 * (c) 2016 Sanjeev Premi (spremi@ymail.com)
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *                          (http://spdx.org/licenses/BSD-3-Clause.html)
 *
 */


'use strict';


/**
 * Handles uncaught exceptions.
 */
function onUncaughtException() {
  console.log('::: Uncaught exception!');
}

/**
 * Stops the server.
 */
function stopServer() {
  console.log('::: Stopping application server.');

  process.exit(0);
}


//
// Register event handlers
//
process
  .on('SIGINT', stopServer)
  .on('SIGTERM', stopServer)
  .on('uncaughtException', onUncaughtException);


console.log('::: Starting application server.');

var express = require('express');


//
// Setup server
//
var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);


//
// Start the server
//
server.listen(app.get('port'), app.get('host'), function () {
  console.log(' :: Server listening on ' + app.get('host') + ':' + app.get('port') +
              ' in ' + app.get('mode') + ' mode.');
});

//
// Export application object
//
exports = module.exports = app;
