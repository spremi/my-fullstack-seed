/*
 * (c) 2016 Sanjeev Premi (spremi@ymail.com)
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *                          (http://spdx.org/licenses/BSD-3-Clause.html)
 */


/**
 * @ngdoc overview
 * @name MySeedApp.route:main
 * @description
 * Registers configuration of 'main' route.
 */
(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name MySeedApp.provider:routeMain
   * @description
   * Configures the route - {@link MySeedApp.route:main main}
   */
  function routeMain($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      });
  }

  angular
    .module('MySeedApp.main')
    .config(routeMain);

})();
