/*
 * ExpressJS configuration based on execution mode.
 *
 * (c) 2016 Sanjeev Premi (spremi@ymail.com)
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *                          (http://spdx.org/licenses/BSD-3-Clause.html)
 *
 */


'use strict';


var path = require('path');

var cfg = {
  //
  // Current process environment.
  //
  env: 'development',

  //
  // Path to the application root.
  //
  root: path.normalize(__dirname + '/../../../'),

  //
  // Path to the application ui.
  //
  ui: 'client',

  //
  // Host to bind the application server
  //
  host: 'localhost',

  //
  // Port to bind the application server
  //
  port: 9001
};

//
// Export application object
//
exports = module.exports = cfg;
