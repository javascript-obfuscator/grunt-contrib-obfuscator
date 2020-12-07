# grunt-contrib-obfuscator [![Build Status](https://travis-ci.com/javascript-obfuscator/grunt-contrib-obfuscator.svg?branch=master)](https://travis-ci.com/javascript-obfuscator/grunt-contrib-obfuscator)

> Obfuscate JavaScript files using [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)@^2.0.0.

You can try the javascript-obfuscator module and see all its options here: https://obfuscator.io/

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-obfuscator --save-dev
npm install javascript-obfuscator --save-dev
```

Notice that you should install manually `javascript-obfuscator`. This makes it easier to have a newer version of the obfuscator library if needed.

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-obfuscator');
```

## Obfuscator task
_Run this task with the `grunt obfuscator` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

## Options

[See the options on the obfuscator repo](https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options).

_Note that at this time the `sourceMap` isn't implemented in this plugin._

In addition to the obfuscator options, you can also use:

#### banner
Type: `String`
Default: `''`

This string will be prepended to the obfuscated output. Template strings (e.g. `<%= config.value %>` will be expanded automatically.

## Usage examples

#### Default options

This configuration will obfuscate the input files using the default options.

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

This configuration will obfuscate the input files in a destination folder by keeping the original names and directories

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
            'dest/': [ // the files and their directories will be created in this folder
                'src/js/file1.js',
                'src/js/folder/file2.js'
            ]
        }
    }
}
```

#### Debug protection and banner

Here you code will be protected against debugging and locked to the domain `www.example.com`.

```javascript
obfuscator: {
    options: {
        banner: '// obfuscated with grunt-contrib-obfuscator.\n',
        debugProtection: true,
        debugProtectionInterval: true,
        domainLock: ['www.example.com']
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
