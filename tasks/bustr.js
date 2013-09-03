'use strict';

var path = require('path'), fs = require('fs'), spawn = require('child_process').spawn;

var VERSION = null;
module.exports = function (grunt) {
	grunt.registerMultiTask('bustr', 'Bust yo chache', function () {
		var done = this.async();
		var src = this.data.src;
		var task = this.data.tasks;
		var options = this.options();
		var output = options.output;
		VERSION = options.version;

		statFile(src);
	});
	
	// recursivly search the directory for files and return the mtime for each
	function statFiles(path){
		fs.readdirSync(path, function(err, files){
			for(var i=0; i<files.length; i++){
				if(fs.statSync(path+files[i]).isDirectory()){
					statFiles(path+files[i]+'/');
				}
				updateVersion(path+files[i], fs.statSync(path+files[i]).mtime);
			}
		});
	}
	
	function updateVersion(file, time){
		if(file === ''){ return;}
		var data= fs.readFileSync(VERSION, 'utf8');
		data = JSON.parse(data);
		data[path.extname(file).replace('.','')][file] = Math.round((new Date()).getTime() / 1000);
		fs.writeFileSync(VERSION, JSON.stringify(data), 'utf8');
	}
};
