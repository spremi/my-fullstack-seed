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


var _    = require('lodash');
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

/**
 * Get configuration for specified mode.
 *
 * @param {String} mode - Selected mode of execution.
 *
 * @return {Object} Configuration object.
 */
function getConfig(mode) {
  var specific;

  if (typeof mode === 'undefined') {
    specific = {};
  } else {
    try {
      specific = require('./' + mode + '.js');
    } catch(e) {
      specific = {};
    }
  }

  //
  // Apply environment overrides, if available
  //
  if (typeof process.env.HOST !== 'undefined') {
    specific.host = process.env.HOST;
  }

  if (typeof process.env.PORT !== 'undefined') {
    specific.port = process.env.PORT;
  }

  return _.merge(cfg, specific);
}

//
// Export application object
//
exports = module.exports = getConfig(process.env.NODE_ENV);
