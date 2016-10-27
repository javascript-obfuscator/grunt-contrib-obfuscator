grunt-contrib-obfuscator
========================

Grunt plugin for [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator).

**Consider this code alpha.**

[![Build Status](https://travis-ci.org/javascript-obfuscator/grunt-contrib-obfuscator.svg?branch=master)](https://travis-ci.org/javascript-obfuscator/grunt-contrib-obfuscator)

## Installation

Install the package with NPM:

`npm install --save grunt-contrib-obfuscator`

## Usage

```javascript
obfuscator: {
    options: {
        // global options for the obfuscator
    },
    task1: {
        options: {
            // options for each sub task
        },
        files: {
            'dest/output.js': [
            'src/js/file1.js',
            'src/js/file2.js'
            ]
        }
    }
}
```

## Options

[See the options on the obfuscator repo](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options).

Note that at this time the `sourceMap` isn't implemented in this plugin.
