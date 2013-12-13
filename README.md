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
