[![Build Status](https://travis-ci.org/kmulvey/grunt-bustr.svg?branch=master)](https://travis-ci.org/kmulvey/grunt-bustr)

# Grunt Bustr

A static asset versioning plugin for [gruntjs](http://gruntjs.com/). 

### Methodology

Lots of cache busting plugins append a MD5 or similar hash to the file name in order to get the user's browser to request the new file. A hash proves uniqueness but is not meaningful to humans, a number that is simply incremented gives uniqueness and shows direction.  When something is broken in production and you need to know is the browsers is processing an old version of your js or css a simple number can help.  Timestamps are even better, they add a third dimension to this by telling you exactly when the file was built while providing uniqueness and direction.  This plugin uses the mtime of the files it finds in the directories you provide and writes those values along with the file name to a version file which your server code would use when including these assets in you html files/templates.  The date format that is written in ascending resolution: YYYYMMDDHHMMSS.

### Getting started

#### Requirements

* Grunt >= 0.4
* An empty json file to store the values

Install to your project by either adding grunt-bustr to you package.json as a dependency or simple run `npm install grunt-bustr`.  



### Sample config

```javascript
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
