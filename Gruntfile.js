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
  // Profile the tasks
  //
  require('time-grunt')(grunt);

  //
  // Load plugins automatically
  //
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server'
  });

  //
  // Configure the tasks
  //
  grunt.initConfig({
    //
    // Project information
    //
    pkg: pkgInfo,

    //
    // Project structure
    //
    proj: {
      client: 'client',
      server: 'server',
      dist: 'dist'
    },

    //
    // Project environment
    //
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },

    //
    // Detect errors & potential problems
    //
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      client: {
        options: {
          jshintrc: 'client/.jshintrc'
        },
        src: [
          '<%= proj.client %>/app/**/*.js',
          '!<%= proj.client %>/app/**/*.spec.js',
          '!<%= proj.client %>/app/**/*.mock.js'
        ]
      },
      clientTest: {
        src: [
          '<%= proj.client %>/app/**/*.spec.js',
          '<%= proj.client %>/app/**/*.mock.js'
        ]
      },
      server: {
        options: {
          jshintrc: '<%= proj.server %>/.jshintrc'
        },
        src: [
          '<%= proj.server %>/**/*.js',
          '!<%= proj.server %>/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: '<%= proj.server %>/.jshintrc-spec'
        },
        src: ['<%= proj.server %>/**/*.spec.js']
      }
    },

    //
    // Express server
    //
    express: {
      options: {
        port: require('./server/config/mode').port
      },
      dev: {
        options: {
          script: '<%= proj.server %>/main.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: '<%= proj.dist %>/<%= proj.server %>/main.js'
        }
      }
    },

    //
    // Watch
    //
    watch: {}
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
  // Task: serve
  //
  grunt.registerTask('serve', 'Serve the application',
    function() {
      grunt.log.writeln('\n :: Serve '['yellow']);

      grunt.task.run([
        'banner',
        'newer:jshint',
        'env:dev',
        'express:dev',
        'watch'
      ]);
    });

  //
  // Default task
  //
  grunt.registerTask('default', [
    'banner',
    'newer:jshint',
    'env:prod'
  ]);
};
