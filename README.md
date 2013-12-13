Sample config

```
module.exports = function(grunt) {
  grunt.initConfig({
		bustr: {
			dist: {
				src: 'src/',
				options: {
					version: 'version.json'
				}
			}
		}
	});
  grunt.loadNpmTasks('grunt-bustr');
};
```
