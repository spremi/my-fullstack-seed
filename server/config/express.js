/*
 * ExpressJS configuration
 *
 * (c) 2016 Sanjeev Premi (spremi@ymail.com)
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *                          (http://spdx.org/licenses/BSD-3-Clause.html)
 *
 */


'use strict';


var express = require('express');
var path    = require('path');
var config  = require('./mode');

/**
 * Configure the ExpressJS instance.
 */
function configExpress(app) {

  app.set('host', config.host);
  app.set('port', config.port);
  app.set('mode', config.env);

  app.set('view engine', 'html');

  app.use(express.static(path.join(config.root, config.ui)));
  app.set('appPath', path.join(config.root, config.ui));
}

//
// Export the function
//
exports = module.exports = configExpress;
