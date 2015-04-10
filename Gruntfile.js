/*jshint expr:true*/
/*global module:false*/
module.exports = function (grunt) {
	// use --no-livereload to disable livereload. Helpful to 'serve' multiple projects
	var isLivereloadEnabled = (typeof grunt.option('livereload') !== 'undefined') ? grunt.option('livereload') : 35730;

	// release minor or patch version. Do major releases manually
	var versionReleaseType = (typeof grunt.option('minor') !== 'undefined') ? 'minor' : 'patch';

	// Project configuration.
	grunt.initConfig({
		// Metadata
		bannerRelease: '/*!\n' +
				' * Marketing Cloud Theme v<%= pkg.version %> \n' +
				' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
				' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
				' */\n',
		banner: '/*!\n' +
				' * Marketing Cloud Theme EDGE - Built <%= grunt.template.today("yyyy/mm/dd, h:MM:ss TT") %> \n' +
				' * Previous release: v<%= pkg.version %> \n' +
				' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
				' * Licensed under the <%= pkg.license.type %> license (<%= pkg.license.url %>)\n' +
				' */\n',
		pkg: grunt.file.readJSON('package.json'),
		// Tasks configuration

		// add comments abou the regex-foo
		'string-replace': {
			inline: {
				files: {
					"less/icons/icons-svg.less": "less/icons/icons-svg.less",
					"less/icons/icons-png.css": "less/icons/icons-png.css",
					"less/icons/icons-png-fallback.css": "less/icons/icons-png-fallback.css"
				},

				// we have to go through and massage the .less file that gruntion makes
				// 
				// as it is created it only supports .fuelux-icon- prefixen, and we need it to support .glyphicon- also, so that the theme can override bootstrap and fuelux fefaults
				// 
				options: {
					replacements: [{
						// so, first we add .glyphicon as a prefix in addition to .fuelux-icon
						pattern: /\.fuelux-icon(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)\s*/g,
						replacement: '.fuelux-icon$1, .glyphicon$1 '
					}

						, {
							// we need to temporarily change -checked-hover-active into something else that we will tweek later.
							// 
							// if we were to do this replacement "for real" right now,there are replacements soon that would ruin it (same if reversed)
							// 
							// so, we replace it with TOBECHECKEDHOVERACTIVE and then the replacements looking for -checked or -hover or -active will leave it alone.
							pattern: /(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)-checked-hover-active\s*/g,
							replacement: '$1-TOBECHECKEDHOVERACTIVE '
						}

						, {
							// we need to temporarily change -active-hover into something else that we will tweek later.
							// 
							// if we were to do this replacement "for real" right now,there are replacements soon that would ruin it (same if reversed)
							// 
							// so, we replace it with TOBEACTIVEHOVER and then the replacements looking for -hover or -active will leave it alone.
							pattern: /(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)-active-hover\s*/g,
							replacement: '$1-TOBEACTIVEHOVER '
						}

						, {
							// Replace (pattern) dash hover with (itself), (pattern):hover, 
							// and (itself as a direct decendant of a button that is being hovered)
							// 
							// The first one means that, say, .fuelux-icon-checkbox-hover as a 
							// classname will render the proper icon...
							// 
							// ...but so will .fuelux-icon-checkbox:hover ...
							// 
							// ...which gets us *automatic hover states for all icons which follow 
							// the proper naming convention*.
							// 
							// The last one tells the icons to show the hover state if they are 
							// inside a button that is itself being hovered. Search is a good 
							// example of where this happens.
							pattern: /(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)-hover\s*/g,
							replacement: '$1-hover, $1:hover, button:hover > $1 '
						}

						, {
							// Follows the same patterns, and reasoning, for -hover, above.
							pattern: /(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)-active\s*/g,
							replacement: '$1-active, $1:active, button:active > $1 '
						}

						, {
							// Follows the same patterns, and reasoning, for -hover, above.
							pattern: /(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)-focus\s*/g,
							replacement: '$1-focus, $1:focus, button:focus > $1 '
						}


						, {
							// Here we go ahead and safely affect the change on TOBEACTIVEHOVER, now that 
							// the other replacements have happened.
							pattern: /(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)-TOBEACTIVEHOVER\s*/g,
							replacement: '$1-active-hover, $1:active:hover, button:active:hover > $1 '
						}

						, {
							// Safe to do this now, too.
							pattern: /(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)-TOBECHECKEDHOVERACTIVE\s*/g,
							replacement: '$1-checked-hover-active, $1:checked:active:hover, button:active:hover > $1:checked '
						}

						, {
							// Add a .fuelux-icon mixin to all the icons, so taht they catch the 
							// inherited rules of height, width, background-size, and so forth.
							pattern: /\}/g,
							replacement: '.fuelux-icon; } '
						}
					]
				}
			}
		},



		bump: {
			options: {
				files: ['bower.json', 'package.json'],
				updateConfigs: ['pkg'],
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
				files: [{
					cwd: 'dist/',
					expand: true,
					src: ['fuelux-mctheme/**']
				}],
				options: {
					archive: 'dist/fuelux-mctheme.zip',
					mode: 'zip'
				}
			}
		},
		copy: {
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
					port: process.env.PORT || 8000,
					useAvailablePort: true// don't be greedy with your ports
				}
			},
			testServer: {
				options: {
					hostname: '*',
					port: 9000,// allows main server to be run simultaneously
					useAvailablePort: true// don't be greedy with your ports
				}
			}
		},
		curl: {
			// Micro libraries via http://microjs.com/
			'docs.zip': 'https://github.com/twbs/bootstrap/archive/master.zip'
		},

		grunticon: {
			makeSvgIcons: {
				files: [{
					expand: true,
					cwd: "icons/svg-optimized",
					src: ['*.svg', '*.png'],
					dest: "less/icons"
				}],
				options: {
					"cssprefix": ".fuelux-icon-",
					"datasvgcss": "icons-svg.less",
					"datapngcss": "icons-png.css",
					"urlpngcss": "icons-png-fallback.css",
					"defaultWidth": "20px",
					"defaultHeight": "20px",
					"previewTemplate": "icons/preview-custom.hbs",
					"previewhtml": "../../examples/icons/icons.html"
				}
			}
		},



		less: {
			dev: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>-dev.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>-dev.css.map'
				},
				files: {
					'dist/css/fuelux-mctheme-dev.css': 'less/fuelux-mctheme.less'
				}
			},
			dist: {
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
					compress: true,
					report: 'min'
				},
				files: {
					'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
				}
			}
		},
		replace: {
			readme: {
				src: ['DETAILS.md', 'README.md'],
				overwrite: true,// overwrite matched source files
				replacements: [{
					from: /fuelux-mctheme\/\d\.\d\.\d/g,
					to: "fuelux-mctheme/<%= pkg.version %>"
				}]
			},
			imgpaths: {
				overwrite: true,
				replacements: [{
					from: "'../../img",
					to: "'../img"
				}],
				src: [
					'dist/css/fuelux-mctheme.css',
					'dist/css/fuelux-mctheme.css.map'
				]
			},
			imgpathsdev: {
				overwrite: true,
				replacements: [{
					from: "'../../img",
					to: "'../img"
				}],
				src: [
					'dist-dev/css/fuelux-mctheme.css',
					'dist-dev/css/fuelux-mctheme.css.map'
				]
			}
		},
		shell: {
			pullMaster: {
				command: 'git checkout master && git pull origin master'
			},
			pullRelease: {
				command: 'git checkout 1.x && git pull origin 1.x'
			},
			mergeRelease: {
				command: 'git merge master'
			},
			commitRelease: {
				command: 'git add dist && git add *.md && git add *.json && git commit -m "release <%= pkg.version %>"'
			},
			tagRelease: {
				command: 'git tag -a <%= pkg.version %> -m "v<%= pkg.version %>"'
			},
			syncDistWithMaster: {
				command: 'git checkout master -- dist/'
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'icons/svg-exports',
					src: ['*.svg'],
					dest: 'icons/svg-optimized'
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
				files: ['Gruntfile.js', 'examples/**', 'less/**'],
				options: {
					livereload: isLivereloadEnabled
				},
				tasks: ['distcss']
			},
			dev: {
				files: ['Gruntfile.js', 'less/**', 'index.html', 'index-dev.html', '*-dev.html', 'dev.html'],
				options: {
					livereload: isLivereloadEnabled
				},
				tasks: ['distcssdev']
			}
		}
	});

	// Look ma! Load all grunt plugins in one line from package.json
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});

	/* -------------
	 BUILD
	 ------------- */

	// Icon creation task
	grunt.registerTask('iconify', ['svgmin', 'grunticon']);

	// CSS distribution task
	grunt.registerTask('distcss', 'Compile LESS into the dist CSS', ['less:dist', 'replace:imgpaths', 'less:minify', 'usebanner']);

	// CSS dev distribution task
	grunt.registerTask('distcssdev', 'Compile LESS into the dev CSS', ['less:dev']);

	// ZIP distribution task
	grunt.registerTask('distzip', ['copy:zipsrc', 'compress', 'clean:zipsrc']);

	// Full distribution task
	grunt.registerTask('dist', ['clean:dist', 'distcss', 'distzip']);

	// The default build task
	grunt.registerTask('default', ['dist']);


	// SVG Icon Making Tools
	grunt.loadNpmTasks('grunt-grunticon');


	/* ----------------
		Making Icons
	---------------- */
	grunt.registerTask('make-icons', ['svgmin', 'grunticon:makeSvgIcons', 'string-replace']);
	grunt.registerTask('make-icons-base', ['grunticon:makeSvgIcons']);
	grunt.registerTask('glyphify-icons', ['string-replace']);

	/* -------------
		RELEASE
	------------- */
	// Maintainers: Run prior to a release. 
	// --minor will create a semver minor release, otherwise a patch release will be created
	grunt.registerTask('release', 'Build a new version', function () {
		grunt.config('banner', '<%= bannerRelease %>');
		grunt.task.run(['bump-only:' + versionReleaseType, 'dist', 'replace:readme']);
	});

	grunt.registerTask('gitrelease', ['shell:pullMaster', 'shell:pullRelease', 'shell:mergeRelease', 'release', 'shell:commitRelease', 'shell:tagRelease']);

	/* -------------
			SERVE
		------------- */
	grunt.registerTask('servedev', ['distcssdev', 'connect:server', 'watch:dev', 'shell:syncDistWithMaster']);// This allows you to serve and watch files without overwriting the compiled css in the /dist/ directory.
	grunt.registerTask('serve', ['dist', 'connect:server', 'watch:full']);
};
