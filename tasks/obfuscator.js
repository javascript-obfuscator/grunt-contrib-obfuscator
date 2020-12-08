'use strict';

var chalk = require('chalk');

var JavaScriptObfuscator = require('javascript-obfuscator');

function obfuscate(source, options) {
  var obfuscationResult = JavaScriptObfuscator.obfuscate(source, options);
  var sourceMap = obfuscationResult.getSourceMap();
  return {
    code: obfuscationResult.getObfuscatedCode(),
    map: sourceMap && JSON.parse(sourceMap)
  };
}

// Converts \r\n to \n
function normalizeLf(string) {
  return string.replace(/\r\n/g, '\n');
}

function getFilename(path) {
  return path.replace(/^.*[\\\/]/, '');
}

module.exports = function (grunt) {
  var getAvailableFiles = function (filesArray) {
    return filesArray.filter(function (filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found');
        return false;
      }
      return true;
    });
  };

  function writeMap(filenames, map, mapFilename) {
    if(!map) {
      return;
    } // source map is set to inline, or disabled.
    map.sources = filenames;
    grunt.file.write(mapFilename, JSON.stringify(map));
  }

  grunt.registerMultiTask('obfuscator', 'Obfuscate JavaScript', function () {
    var created = {
      maps: 0,
      files: 0
    };

    this.files.forEach(function (file) {
      var options = this.options({
        banner: ''
      });

      var banner = normalizeLf(options.banner);

      var availableFiles = getAvailableFiles(file.src);

      if (options.sourceMap && options.banner) {
        grunt.log.error('Source Maps are not available with banner option yet.');
        return;
      }

      var obfuscated;

      var filenameDest = getFilename(file.dest);

      if (filenameDest) {
        try {
          var totalCode = availableFiles.map(function (file) {
              return grunt.file.read(file);
          }).join('');

          obfuscated = obfuscate(totalCode, options);

        } catch (err) {
          grunt.log.error(err);
          grunt.warn('JavaScript Obfuscation failed at ' + availableFiles + '.');
        }

        var output = banner + obfuscated.code;

        if(options.sourceMap) {
          if(availableFiles.length > 1) {
            grunt.log.error('Source Maps are not available with multiple files yet. Hint: you can use grunt-contrib-concat to combine files.');
          } else {
            var mapFilename = options.sourceMapFilename || file.dest + '.map';
            if(options.sourceMapMode !== 'inline') {
              writeMap(availableFiles, obfuscated.map, mapFilename);
              output += '\n//# sourceMappingURL=' + (options.sourceMapBaseUrl || '') + '/' + mapFilename;
            }
            created.files++;
          }
        }
        grunt.file.write(file.dest, output);

        created.files++;
      } else {
        availableFiles.forEach(function (fileSrc) {
          try {
            var code = grunt.file.read(fileSrc);

            obfuscated = obfuscate(code, options);

          } catch (err) {
            grunt.log.error(err);
            grunt.warn('JavaScript Obfuscation failed at ' + fileSrc + '.');
          }

          var output = banner + obfuscated.code;
        
          if(options.sourceMap) {
            grunt.log.error('Source Maps are not available with multiple files yet. Hint: you can use grunt-contrib-concat to combine files.');
          }
          grunt.file.write(file.dest + fileSrc, output);

          created.files++;
        });
      }
    }, this);

    if (created.files > 0) {
      grunt.log.ok(created.files + ' ' + grunt.util.pluralize(this.files.length, 'file/files') + ' created');
    } else {
      grunt.log.warn('No files created.');
    }
  });
};