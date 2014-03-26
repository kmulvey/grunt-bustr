'use strict';

var path = require('path'), fs = require('fs');

module.exports = function (grunt) {
	grunt.registerMultiTask('bustr', 'Bust yo cache', function () {
		var src = this.data.src;
		var options = this.options();
		var version_file = options.version;
		
		// was version passed?
		if(!version_file){
			grunt.fail.fatal("version was not passed, please specify a version file.");
		}
		
		// check if version file exists
		if(!grunt.file.exists(version_file)){
			grunt.fail.fatal("version file does not exist, please create an empty file.");
		}

		// find files to process
		grunt.file.recurse(src, function(abspath) {
			statFile(abspath, version_file);
		});
	});
	
	// recursively search the directory for files and return the mtime for each
	function statFile(path, version_file){
		var dt = new Date(fs.statSync(path).mtime);
		var version_str = "" + dt.getFullYear() + dt.getMonth() + dt.getDate() + dt.getHours() + dt.getMinutes() + dt.getSeconds();
		updateVersion(path, version_str, version_file);
	}
	
	function updateVersion(file, time, version_file){
		var data = fs.readFileSync(version_file, 'utf8');
		if(data === ''){
			data = '{}'; // default, in case its a 0b file 
		}
		
		try{
			data = JSON.parse(data);
		} catch (e) {
	  	grunt.fail.fatal("Problem parsing the version file: ", e); 
		}
		
		// create object if it doesnt exist
		if(data[path.extname(file).replace('.','')] === undefined){
			data[path.extname(file).replace('.','')] = {};
		}

		// log only changed files
		if(data[path.extname(file).replace('.','')][path.basename(file)] !== time){
			grunt.log.writeln(file + " .... " + time);
		}
		data[path.extname(file).replace('.','')][path.basename(file)] = time;
		fs.writeFileSync(version_file, JSON.stringify(data), 'utf8');
	}
};
