[![Build Status](https://travis-ci.org/kmulvey/grunt-bustr.png?branch=v1.2.0)](https://travis-ci.org/kmulvey/grunt-bustr)

## Sample config

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
