/*
 * Rules to build the application.
 *
 * (c) 2016 Sanjeev Premi (spremi@ymail.com)
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *                          (http://spdx.org/licenses/BSD-3-Clause.html)
 *
 */


'use strict';


module.exports = function (grunt) {

  //
  // Read project configuration
  //
  var pkgInfo = grunt.file.readJSON('package.json');

  //
  // Configure the tasks
  //
  grunt.initConfig({
    //
    // Project information
    //
    pkg: pkgInfo,
  });


  //
  // Task: Show banner
  //
  grunt.registerTask('banner', 'Show banner',
    function() {

      var str = ':::'['yellow'] + '\n' +
                '::: Building '['yellow'] + pkgInfo.name['magenta'] +
                    ' version '['yellow'] + pkgInfo.version['cyan'] + '\n' +
                ':::'['yellow'];

      grunt.log.writeln(str);
    });

  //
  // Default task
  //
  grunt.registerTask('default', [
    'banner'
  ]);
};
