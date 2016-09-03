/*
 * (c) 2016 Sanjeev Premi (spremi@ymail.com)
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *                          (http://spdx.org/licenses/BSD-3-Clause.html)
 */


/**
 * @ngdoc overview
 * @name MySeedApp
 * @description
 * Defines & configures the angular module.
 */
(function () {
  'use strict';

  /**
   * Configures the application
   *
   * @param $stateProvider
   * @param $urlRouterProvider
   * @param $locationProvider
   */
  function configureApp($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider
      .html5Mode(true);
  }


  angular
    .module('MySeedApp', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ui.router'
      ])
    .config(configureApp);
})();
