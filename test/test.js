'use strict';

var grunt = require('grunt');

function readFile(file) {
  return grunt.file.read(file);
}

exports.obfuscator = {
  single: function(test) {
    test.expect(4);

    var result = readFile('tmp/single-out.js');

    var shout = eval(result);

    // tests whether the script run as expected after being obfsucated
    test.equal(shout('Hello World'), 'HELLO WORLD!');

    // plain strings should be hidden, ensures that the obfuscation has happened
    test.ok(result.indexOf('Hello') === -1);

    // tests whether the `reservedNames` option was correctly passed to the library
    test.ok(result.indexOf('upper') !== -1);

    // checks is the `banner` option is working
    test.ok(result.indexOf('// obfuscated by javascript-obfuscator\n') === 0);

    test.done();
  },
  multiple: function(test) {
    test.expect(3);

    var result = readFile('tmp/multiple-out.js');

    var answer = eval(result)();

    test.equal(answer.number, 42);
    test.equal(answer.str, 'Forty Two');

    // tests whether the obfuscation worked
    test.ok(result.indexOf('Forty Two') === -1);

    test.done();
  }
};
