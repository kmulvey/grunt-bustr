'use strict';

var path = require('path'), fs = require('fs');

var VERSION = null;
module.exports = function (grunt) {
	grunt.registerMultiTask('bustr', 'Bust yo chache', function () {
		var done = this.async();
		var src = this.data;
		var options = this.options();
		VERSION = options.version;
		
		grunt.file.recurse('src', function(abspath, rootdir, subdir, filename) {
			statFile(abspath);
		});
	});
	
	// recursivly search the directory for files and return the mtime for each
	function statFile(path){
		console.log(path + ' ... ' + fs.statSync(path).mtime);
		updateVersion(path, fs.statSync(path).mtime);
	}
	
	function updateVersion(file, time){
		var data = fs.readFileSync(VERSION, 'utf8');
		if(data === '') data = '{}'; // default it in case its a 0b file 
		data = JSON.parse(data);
		
		if(data[path.extname(file).replace('.','')] === undefined) data[path.extname(file).replace('.','')] = {};
		data[path.extname(file).replace('.','')][path.basename(file)] = time;
		fs.writeFileSync(VERSION, JSON.stringify(data), 'utf8');
	}
};
