'use strict';

var path = require('path'), fs = require('fs');

module.exports = function (grunt) {
	grunt.registerMultiTask('bustr', 'Bust yo chache', function () {
		var done = this.async();
		var src = this.data.src;
		var options = this.options();
		var version = options.version;
		
		grunt.file.recurse(src, function(abspath, rootdir, subdir, filename) {
			statFile(abspath, version);
		});
	});
	
	// recursivly search the directory for files and return the mtime for each
	function statFile(path, version){
		var dt = new Date(fs.statSync(path).mtime);
		var version_str = "" + dt.getFullYear() + dt.getMonth() + dt.getDate() + dt.getHours() + dt.getMinutes() + dt.getSeconds();
		console.log(path + ' ... ' + dt);
		updateVersion(path, version_str, version);
	}
	
	function updateVersion(file, time, version){
		var data = fs.readFileSync(version, 'utf8');
		if(data === ''){
			data = '{}'; // default it in case its a 0b file 
		}
		data = JSON.parse(data);
		
		if(data[path.extname(file).replace('.','')] === undefined){
			data[path.extname(file).replace('.','')] = {};
		}
		data[path.extname(file).replace('.','')][path.basename(file)] = time;
		fs.writeFileSync(version, JSON.stringify(data), 'utf8');
	}
};
