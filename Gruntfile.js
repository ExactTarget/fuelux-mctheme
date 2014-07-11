/*jshint expr:true*/
/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata
		banner: '/*!\n' +
			' * Fuel UX IMH-Theme v<%= pkg.version %> \n' +
			' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
			' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
			' */\n',
		pkg: grunt.file.readJSON('package.json'),

		// Tasks configuration
		clean: {
			dist: ['dist/**'],
			zipsrc: ['dist/fuelux-imhtheme']
		},
		compress: {
			zip: {
				files: [
					{
						cwd: 'dist/',
						expand: true,
						src: ['fuelux-imhtheme/**']
					}
				],
				options: {
					archive: 'dist/fuelux-imhtheme.zip',
					mode: 'zip'
				}
			}
		},
		copy: {
			fonts: {
				cwd: 'fonts/',
				dest: 'dist/fonts/',
				expand: true,
				filter: 'isFile',
				src: ['*']
			},
			zipsrc: {
				cwd: 'dist/',
				dest: 'dist/fuelux-imhtheme/',
				expand: true,
				src: ['**']
			}
		},
		connect: {
			server: {
				options: {
					hostname: '*',
					port: 8000
				}
			}
		},
		less: {
			dist: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
				},
				files: {
					'dist/css/fuelux-imhtheme.css': 'less/fuelux-imhtheme.less'
				}
			},
			minify: {
				options: {
					cleancss: true,
					report: 'min'
				},
				files: {
					'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
				}
			}
		},
		watch: {
			files: ['Gruntfile.js', 'lib/**', 'src/**', 'test/**'],
			tasks: ['quicktest', 'quickcss']
		}
	});

	// Look ma! Load all grunt plugins in one line from package.json
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	/* -------------
		BUILD
	 ------------- */

	// CSS distribution task
	grunt.registerTask('distcss', ['less', 'usebanner']);

	// ZIP distribution task
	grunt.registerTask('distzip', ['copy:zipsrc', 'compress', 'clean:zipsrc']);

	// Full distribution task
	grunt.registerTask('dist', ['clean:dist', 'distcss', 'copy:fonts', 'distzip']);

	//The default build task
	grunt.registerTask('default', ['dist']);

	/* -------------
		SERVE
	 ------------- */
	grunt.registerTask('serve', ['test', 'dist', 'connect:server', 'watch:full']);
	grunt.registerTask('servecss', ['connect:server', 'watch:css']);

};
