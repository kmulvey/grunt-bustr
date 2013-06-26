"use strict";

var path = require('path'), spawn = require('child_process').spawn, execSync = require('execSync'), fs = require('fs');
var JS_CHANGED = [];
var VERSION = null;
module.exports = function (grunt) {
	grunt.registerMultiTask('bustr', 'Bust yo chache', function () {
		var done = this.async();
		var src = this.data.src;
		var task = this.data.tasks;
		var options = this.options();
		var output = options.output;
		var ext = options.ext;
		VERSION = options.version;

		getChangedFiles(src, output,  JS_CHANGED, ext, task);
	});
	
	
	function getChangedFiles(source_dir, output_dir, changed_files, ext, task){
		var diff = execSync.stdout('git diff --name-only master...' + getBranch() + ' ' + source_dir);
		var files = diff.split( "\n" ).reverse().filter(function( file ) {
			if(file === '') return false;
			var input = file.trim();
			var output = output_dir + ext + '/' + path.basename(file.trim());
			var f = {};
			f[output] = input;
			changed_files.push(f);
			updateVersion(path.basename(file.trim(), '.'+ext),ext);
		});
		grunt.task.run(task);
	}
	function getBranch(){
		var diff = execSync.stdout("git status -b | grep '# On branch'");
		return diff.replace('\n', '').replace('# On branch ', '');
	}
	function updateVersion(file, ext){
		if(file === '') return;
		var data= fs.readFileSync(VERSION, 'utf8');
		data = JSON.parse(data);
		data[ext][file] = Math.round((new Date()).getTime() / 1000);
		fs.writeFileSync(VERSION, JSON.stringify(data), 'utf8');
	}
};
