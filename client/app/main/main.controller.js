/*
 * (c) 2016 Sanjeev Premi (spremi@ymail.com)
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *                          (http://spdx.org/licenses/BSD-3-Clause.html)
 */


/**
 * @ngdoc controller
 * @name MySeedApp.main.controller:MainCtrl
 * @description
 * Implements the main controller.
 */
(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name MySeedApp.main.provider:MainCtrl
   * @description
   * Provides the controller - {@link MySeedApp.main.controller:MainCtrl MainCtrl}
   */
  function MainCtrl($scope) {
    $scope.hello = 'Hello from main controller';
  }


  angular
    .module('MySeedApp.main')
    .controller('MainCtrl', MainCtrl);

})();
