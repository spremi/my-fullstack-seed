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
    // Run-time project configuration
    //
    projCfg: {},

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
        port: '<%= projCfg.port %>'
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
    watch: {},

    //
    // Open
    //
    open: {
      server: {
        url: 'http://<%= projCfg.host %>:<%= projCfg.port %>'
      }
    },

    //
    // Injector
    //
    injector: {
      options: {
        relative: true,
        addRootSlash: false
      },

      //
      // Scripts from the application
      //
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');

            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js:begin -->',
          endtag: '<!-- injector:js:end -->'
        },
        files: {
          '<%= proj.client %>/index.html': [
            '<%= proj.client %>/app/**/*.js',
            '!<%= proj.client %>/app/app.js',
            '!<%= proj.client %>/app/**/*.spec.js',
            '!<%= proj.client %>/app/**/*.mock.js'
          ]
        }
      },
      stylus: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');

            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector:stylus:begin',
          endtag: '// injector:stylus:end'
        },
        files: {
          '<%= proj.client %>/app/app.styl': [
            '<%= proj.client %>/app/**/*.styl',
            '!<%= proj.client %>/app/app.styl'
          ]
        }
      },
      bower_deps: {
        options: {
          starttag: '<!-- injector:bower.{{ext}}:begin -->',
          endtag: '<!-- injector:bower.{{ext}}:end -->'
        },
        files: {
          '<%= proj.client %>/index.html': ['bower.json']
        }
      },
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');

            return '<link rel="stylesheet" href="' + filePath + '"/>';
          },
          starttag: '<!-- injector:css:begin -->',
          endtag: '<!-- injector:css:end -->'
        },
        files: {
          '<%= proj.client %>/index.html': [
            '<%= proj.client %>/app/**/*.css',
            '!<%= proj.client %>/app//app/app-compiled.css'
          ]
        }
      }
    },

    //
    // Compile stylus to css
    //
    stylus: {
      compile: {
        options: {
          paths: [
            '<%= proj.client %>/lib',
            '<%= proj.client %>/app',
          ],
          "include css": true
        },
        files : {
          '<%= proj.client %>/app/app-compiled.css' : '<%= proj.client %>/app/app.styl'
        }
      }
    }
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
  // Task: Apply project configuration
  //       (Configuration within sources shall be exported to 'dist'.
  //        So, it can be safely used in all build modes.)
  //
  grunt.registerTask('projcfg', 'Get configuration based on chosen environment',
    function (arg) {
      var cfg = require('./server/config/mode');

      grunt.config.merge({
        projCfg: cfg
      });
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
        'projcfg',
        'injector',
        'stylus',
        'express:dev',
        'open',
        'watch'
      ]);
    });

  //
  // Default task
  //
  grunt.registerTask('default', [
    'banner',
    'newer:jshint',
    'env:prod',
    'projcfg',
    'injector',
    'stylus'
  ]);
};
