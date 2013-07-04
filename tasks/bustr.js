var path = require('path'), fs = require('fs'), spawn = require('child_process').spawn;

'use strict';

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

		getChangedFiles(src, output, ext);
	});
	
	function getChangedFiles(source_dir, output_dir, ext){
    getBranch(function(branch){
			var diff = spawn('git', ['diff','--name-only', 'master...'+branch, source_dir]);
			diff.stdout.setEncoding('utf8');
			diff.stdout.on('data', function (data) {
				var files = data.split( "\n" ).reverse().filter(function( file ) {
					if(file === '') return false;
					updateVersion(path.basename(file.trim(), '.'+ext),ext);
				});
			});
			diff.stderr.on('data', function (data) {
				console.log('ERROR GENERATING DIFF: ' + data);
			});
		});	
	}
	function getBranch(cb){
    var branch = spawn('git', ['symbolic-ref', 'HEAD']);
		branch.stdout.setEncoding('utf8');
		branch.stdout.on('data', function (data) {
			cb(data.replace('refs/heads/', '').trim());
		});
	}
	function updateVersion(file, ext){
		if(file === '') return;
		var data= fs.readFileSync(VERSION, 'utf8');
		data = JSON.parse(data);
		data[ext][file] = Math.round((new Date()).getTime() / 1000);
		fs.writeFileSync(VERSION, JSON.stringify(data), 'utf8');
	}
};
