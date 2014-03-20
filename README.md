[![Build Status](https://travis-ci.org/kmulvey/grunt-bustr.svg?branch=master)](https://travis-ci.org/kmulvey/grunt-bustr)

# Grunt Bustr

A static asset versioning plugin for [gruntjs](http://gruntjs.com/). 


### Getting started

Install to your project by either adding grunt-bustr to you package.json as a dependency or simple run `npm install grunt-bustr`.  Grunt >= 0.4 is required.



### Sample config

```
module.exports = function(grunt) {
  grunt.initConfig({
		bustr: {
			css: {
				src: 'src/css/',
					options: {
						version: 'version.json'
					}
			},
			js: {
				src: 'src/js/',
				options: {
					version: 'version.json'
				}
			}
		}
	});
  grunt.loadNpmTasks('grunt-bustr');
};
```
