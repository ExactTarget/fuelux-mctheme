/*jshint expr:true*/
/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata
		banner: '/*!\n' +
			' * IMH-Theme v<%= pkg.version %> \n' +
			' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
			' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
			' */\n',
		pkg: grunt.file.readJSON('package.json'),

		// Tasks configuration
		clean: {
			dist: ['dist/**'],
			zipsrc: ['dist/imhtheme']
		},
		compress: {
			zip: {
				files: [
					{
						cwd: 'dist/',
						expand: true,
						src: ['imhtheme/**']
					}
				],
				options: {
					archive: 'dist/imhtheme.zip',
					mode: 'zip'
				}
			}
		},
		copy: {
			img: {
				cwd: 'img/',
				dest: 'dist/img/',
				expand: true,
				filter: 'isFile',
				src: ['*']
			},
			zipsrc: {
				cwd: 'dist/',
				dest: 'dist/imhtheme/',
				expand: true,
				src: ['**']
			},
			docscss: {
				cwd: 'dist/css/',
				dest: 'docs/dist/css/',
				expand: true,
				src: ['**'],
				rename: function (dest, src) {
					return dest + src.replace(/imh/g, 'bootstrap-');
				}
			},
			docsimg: {
				cwd: 'dist/img/',
				dest: 'docs/dist/img/',
				expand: true,
				src: ['**']
			}
		},
		unzip: {
			'docs': 'docs.zip'
		},
		connect: {
			server: {
				options: {
					hostname: '*',
					port: 8000
				}
			},
			testServer: {
				options: {
					hostname: '*',
					port: 9000		// allows main server to be run simultaneously
				}
			}
		},
		curl: {
		// Micro libraries via http://microjs.com/
			'docs.zip': 'https://github.com/twbs/bootstrap/archive/master.zip'
		},
		less: {
			'imhtheme': {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
				},
				files: {
					'dist/css/imhtheme.css': 'less/imhtheme.less'
				}
			},
			minify: {
				options: {
					cleancss: true,
					report: 'min'
				},
				files: {
					'dist/css/imhtheme.min.css': 'dist/css/imhtheme.css'
				}
			}
		},
		replace: {
			imgpaths: {
				overwrite: true,
				replacements:[
					{
						from: "'../../img",
						to: "'../img"
					}
				],
				src: [
					'dist/css/fuelux-imhtheme.css',
					'dist/css/fuelux-imhtheme.css.map'
				]
			}
		},
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					src: [
						'dist/css/imhtheme.css',
						'dist/css/imhtheme.min.css'
					]
				}
			}
		},
		watch: {
			full: {
				files: ['less/**'],
				options: {
					livereload: true,
				},
				tasks: ['distcss']
			}
		}
	});

	// Look ma! Load all grunt plugins in one line from package.json
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	/* -------------
	 BUILD
	 ------------- */

	// CSS distribution task
	grunt.registerTask('distcss', ['less:imhtheme', 'replace:imgpaths', 'less:minify', 'usebanner']);

	// ZIP distribution task
	grunt.registerTask('distzip', ['copy:zipsrc', 'compress', 'clean:zipsrc']);

	// Full distribution task
	grunt.registerTask('dist', ['clean:dist', 'copy:img', 'distcss', 'distzip']);

	//The default build task
	grunt.registerTask('default', ['dist']);

	grunt.registerTask('docs', ['dist', 'copy:docscss', 'copy:docsimg']);

	/* -------------
			SERVE
		------------- */
	grunt.registerTask('serve', ['dist', 'connect:server', 'watch:full']);

};
