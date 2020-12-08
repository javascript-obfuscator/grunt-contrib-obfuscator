'use strict';

module.exports = function (grunt) {
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      test: ['tmp']
    },

    obfuscator: {
      options: {
      },
      single: {
        options: {
          reservedNames: ['upper'],
          banner: '// obfuscated by javascript-obfuscator\n'
        },
        files: {
          'tmp/single-out.js': [
            'test/fixtures/single.js'
          ]
         }
      },

      multiple: {
        options: {
        },
        files: {
          'tmp/multiple-out.js': [
            'test/fixtures/file1.js',
            'test/fixtures/file2.js'
          ]
         }
      },

      folderDest: {
        options: {
          unicodeEscapeSequence: true,
        },
        files: {
          'tmp/': [
            'test/fixtures/file3.js',
            'test/fixtures/folder/file4.js'
          ]
         }
      },

      single_sourcemap: {
        options: {
          reservedNames: ['upper'],
          sourceMap: true
        },
        files: {
          'tmp/single-out-sm.js': [
            'test/fixtures/single.js'
          ]
         }
      },
      single_inline: {
        options: {
          reservedNames: ['upper'],
          sourceMap: true,
          sourceMapMode: 'inline'
        },
        files: {
          'tmp/single-out-sm-inline.js': [
            'test/fixtures/single.js'
          ]
         }
      },
    },

    nodeunit: {
      tests: ['test/test.js']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  grunt.registerTask('test', [
    'jshint',
    'clean',
    'obfuscator',
    'nodeunit'
  ]);

  grunt.registerTask('default', [
    'test'
  ]);
};