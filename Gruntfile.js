/*jshint expr:true*/
/*global module:false, process:false*/
module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-recess');

	// Project configuration.
	grunt.initConfig({
		clean: {
			dist: ['dist/build.txt', 'dist/fuelux.zip'],
			zipsrc: ['dist/fuelux']
		},
		compress: {
			zip: {
				options: {
					mode: 'zip',
					archive: 'dist/fuelux.zip'
				},
				files: [
					{
						expand: true,
						cwd: 'dist/',
						src: ['fuelux/**']
					}
				]
			}
		},
		copy: {
			bootstrapImages: {
				expand: true,
				cwd: 'lib/bootstrap/img/',
				src: ['**'],
				dest: 'dist/img/'
			},
			fuelux: {
				expand: true,
				cwd: 'lib/fuelux',
				src: ['**'],
				dest: 'dist'
			},
			images: {
				expand: true,
				cwd: 'src/img/',
				src: ['**'],
				dest: 'dist/img/'
			},
			zipsrc: {
				expand: true,
				cwd: 'dist/',
				src: ['**'],
				dest: 'dist/fuelux/'
			}
		},
		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					define: true,
					require: true
				}
			},
			source: ['Gruntfile.js', 'src/**/*.js'],
			tests: {
				options: {
					undef: false,
					unused: false,
					latedef: false
				},
				files: {
					src: ['test/**/*.js']
				}
			}
		},
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			simple: ['test/**/*.html']
		},
		recess: {
			compile: {
				src: ['src/less/fuelux.less'],
				dest: 'dist/css/fuelux.css',
				options: {
					compile: true
				}
			},
			compile_responsive: {
				src: ['src/less/fuelux-responsive.less'],
				dest: 'dist/css/fuelux-responsive.css',
				options: {
					compile: true
				}
			},
			compress: {
				src: ['src/less/fuelux.less'],
				dest: 'dist/css/fuelux.min.css',
				options: {
					compile: true,
					compress: true
				}
			},
			compress_responsive: {
				src: ['src/less/fuelux-responsive.less'],
				dest: 'dist/css/fuelux-responsive.min.css',
				options: {
					compile: true,
					compress: true
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
					'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
					' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
			},
			all: {
				files: {
					'dist/all.min.js': ['dist/all.js']
				}
			},
			loader: {
				files: {
					'dist/loader.min.js': ['dist/loader.js']
				}
			}
		},
		watch: {
			files: ['Gruntfile.js', 'lib/**', 'src/**', 'test/**'],
			tasks: ['quicktest', 'quickcss']
		}
	});

	grunt.registerTask('quicktest', ['jshint', 'qunit:simple']);

	grunt.registerTask('quickcss', ['recess:compile', 'recess:compile_responsive']);
	grunt.registerTask('fullcss', ['quickcss', 'recess:compress', 'recess:compress_responsive']);

	grunt.registerTask('default', ['quicktest', 'clean:dist', 'copy:bootstrapImages', 'copy:fuelux', 'copy:images', 'fullcss', 'uglify', 'copy:zipsrc', 'compress', 'clean:zipsrc']);
	grunt.registerTask('devserver', ['quicktest', 'quickcss', 'watch']);

};
