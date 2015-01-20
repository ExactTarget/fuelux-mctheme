/*jshint expr:true*/
/*global module:false*/
module.exports = function (grunt) {

	// use --no-livereload to disable livereload. Helpful to 'serve' multiple projects
	var isLivereloadEnabled = (typeof grunt.option('livereload') !== 'undefined') ? grunt.option('livereload') : true;

	// Project configuration.
	grunt.initConfig({
		// Metadata
		banner: '/*!\n' +
			' * Marketing Cloud Theme v<%= pkg.version %> \n' +
			' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
			' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
			' */\n',
		pkg: grunt.file.readJSON('package.json'),

		// Tasks configuration
		bump: {
			options: {
				files: [ 'bower.json', 'package.json' ],
				updateConfigs: [ 'pkg' ],
				commit: false,
				createTag: false,
				tagName: '%VERSION%',
				tagMessage: '%VERSION%',
				push: false,
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
			}
		},
		clean: {
			dist: ['dist/**'],
			zipsrc: ['dist/fuelux-mctheme']
		},
		compress: {
			zip: {
				files: [
					{
						cwd: 'dist/',
						expand: true,
						src: ['fuelux-mctheme/**']
					}
				],
				options: {
					archive: 'dist/fuelux-mctheme.zip',
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
				dest: 'dist/fuelux-mctheme/',
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
					port: 8000,
					useAvailablePort: true	// don't be greedy with your ports
				}
			},
			testServer: {
				options: {
					hostname: '*',
					port: 9000,		// allows main server to be run simultaneously
					useAvailablePort: true	// don't be greedy with your ports
				}
			}
		},
		curl: {
		// Micro libraries via http://microjs.com/
			'docs.zip': 'https://github.com/twbs/bootstrap/archive/master.zip'
		},
		grunticon: {
			dist: {
				files: [{
					expand: true,
					cwd: 'img/svgs-min',
					src: ['*.svg', '*.png'],
					dest: "examples/icons"
				}],
				options: {

					// CSS filenames
					datasvgcss: "mctheme.svg.css",
					datapngcss: "mctheme.png.css",
					urlpngcss: "mctheme.css",

					// preview HTML filename
					previewhtml: "preview.html",

					// grunticon loader code snippet filename
					loadersnippet: "grunticon.loader.js",

					// folder name (within dest) for png output
					pngfolder: "png",

					// prefix for CSS classnames
					cssprefix: ".fuelux-",

					defaultWidth: "128px",
					defaultHeight: "128px",

					// define vars that can be used in filenames if desirable, like foo.colors-primary-secondary.svg
					colors: {
						primary: "red",
						secondary: "#666"
					},

					// css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
					// This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
					cssbasepath: "/",
					template: "examples/icons/default-css.hbs",
					previewTemplate: "examples/icons/preview-custom.hbs"

				}
			}
		},
		less: {
			'fuelux-mctheme': {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
				},
				files: {
					'dist/css/fuelux-mctheme.css': 'less/fuelux-mctheme.less'
				}
			},
			minify: {
				options: {
					cleancss: true,
					report: 'min'
				},
				files: {
					'dist/css/fuelux-mctheme.min.css': 'dist/css/fuelux-mctheme.css'
				}
			}
		},
		replace: {
			readme: {
				src: ['DETAILS.md', 'README.md'],
				overwrite: true,                 // overwrite matched source files
				replacements: [{
					from: /fuelux-mctheme\/\d\.\d\.\d/g,
					to: "fuelux-mctheme/<%= pkg.version %>"
				}]
			},
			imgpaths: {
				overwrite: true,
				replacements:[
					{
						from: "'../../img",
						to: "'../img"
					}
				],
				src: [
					'dist/css/fuelux-mctheme.css',
					'dist/css/fuelux-mctheme.css.map'
				]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'img/src/svgs',
					src: ['*.svg'],
					dest: 'img/svgs-min'
				}]
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
						'dist/css/fuelux-mctheme.css',
						'dist/css/fuelux-mctheme.min.css'
					]
				}
			}
		},
		watch: {
			full: {
				files: ['less/**'],
				options: {
					livereload: isLivereloadEnabled
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

	// Icon creation task
	grunt.registerTask('iconify', ['svgmin', 'grunticon']);

	// CSS distribution task
	grunt.registerTask('distcss', ['less:fuelux-mctheme', 'replace:imgpaths', 'less:minify', 'usebanner']);

	// ZIP distribution task
	grunt.registerTask('distzip', ['copy:zipsrc', 'compress', 'clean:zipsrc']);

	// Full distribution task
	grunt.registerTask('dist', ['clean:dist', 'copy:img', 'distcss', 'distzip']);

	//The default build task
	grunt.registerTask('default', ['dist']);


	/* -------------
		RELEASE
	------------- */
	// Run `grunt bump` first.
	grunt.registerTask('release', 'Update readme, build "dist"', ['dist', 'replace:readme']);

	/* -------------
			SERVE
		------------- */
	grunt.registerTask('serve', ['dist', 'connect:server', 'watch:full']);

};
