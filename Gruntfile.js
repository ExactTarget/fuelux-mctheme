/*jshint expr:true*/
/*global module:false*/
module.exports = function (grunt) {
	// use --no-livereload to disable livereload. Helpful to 'serve' multiple projects
	var isLivereloadEnabled = (typeof grunt.option('livereload') !== 'undefined') ? grunt.option('livereload') : 35730;

	var semver = require('semver');
	var packageVersion = require('./package.json').version;

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
		cdnLoginFile: grunt.file.exists('FUELUX_MCTHEME_CDN.yml') ? grunt.file.readYAML('FUELUX_MCTHEME_CDN.yml') : undefined,
		minorReleaseBranch: '1.5.x',
		majorReleaseBranch: '1.x',
		pkg: grunt.file.readJSON('package.json'),
		// Tasks configuration



		// Copy svg-sources to svg-exports

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
			svgSources: {
				cwd: 'icons/svg-sources',
				src: '**/*',
				dest: 'icons/svg-optimized',
				expand: true
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
		prompt: {
			'releaseTasks': {
				options: {
					questions: [
						{
							config: 'releaseTask',
							type: 'list',
							message: 'What would you like to do?',
							choices: [
								{
									value: 'patch',
									name: 'Patch:  ' + semver.inc(packageVersion, 'patch') + ' Backwards-compatible bug fixes.'
								},
								{
									value: 'minor',
									name: 'Minor:  ' + semver.inc(packageVersion, 'minor') + ' Add functionality in a backwards-compatible manner.'
								},
								{
									value: 'major',
									name: 'Major:  ' + semver.inc(packageVersion, 'major') + ' Incompatible API changes.'
								},
								{
									value: 'custom',
									name: 'Custom: ?.?.? Specify version...'
								},
								{
									value: 'commit',
									name: 'Stage and commit build files'
								},
								{
									value: 'tag',
									name: 'Tag current commit for release'
								},
								{
									value: 'pushPatchBranchToOrigin',
									name: 'Push patch commits to origin\'s minor release branch '
								},
								{
									value: 'pushMinorBranchToOrigin',
									name: 'Push minor commits to origin\'s major release branch'
								},
								{
									value: 'upload',
									name: 'Upload dist folder to CDN server'
								},
								{
									value: 'exit',
									name: 'Exit'
								}
							]
						},
						{
							config: 'bump.version',
							type: 'input',
							message: 'What specific version would you like',
							when: function (answers) {
								return answers['bump.increment'] === 'custom';
							},
							validate: function (value) {
								var valid = semver.valid(value);
								return valid || 'Must be a valid semver, such as 1.2.3-rc1. See http://semver.org/ for more details.';
							}
						}
					]
				}
			}
		},
		replace: {
			readme: {
				src: ['README.md'],
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
			// Compile release notes while waiting for tests to pass. Needs Ruby gem. 
			// Install with: gem install github_changelog_generator
			notes: {
				command: 'github_changelog_generator --no-author --unreleased-only --compare-link'
			},
			mergeLocalMasterAndMinorBranch: {
				command: function() {
					var command = [
						'git checkout master',
						'git pull origin master',
						'git checkout ' + grunt.config('majorReleaseBranch'),
						'git pull origin ' + grunt.config('majorReleaseBranch'), 
						'git merge master '
					].join(' && ')
					grunt.log.write(command);
					return command;
				}

			},
			checkoutPatchBranch: {
				command: function() {
					var command = [
						'git checkout ' + grunt.config('minorReleaseBranch'),
						'git pull origin ' + grunt.config('minorReleaseBranch')
					].join(' && ')
					grunt.log.write(command);
					return command;
				}
			},
			addReleaseFiles: {
				command: 'git add dist README.md bower.json package.json'
			},
			commit: {
				command: function() {
					var command = [
						'git commit -m "release ' + grunt.config('pkg.version') + '"'
					].join(' && ')
					grunt.log.write(command);
					return command;
				}
			},
			tag: {
				command: function() {
					var command = [
						'git tag -a "' + grunt.config('pkg.version') + '" -m "' + grunt.config('pkg.version') + '"'
					].join(' && ')
					grunt.log.write(command);
					return command;
				}
			},
			pushLocalMinorBranchToOrigin: {
				command: 'git push origin ' + grunt.config('majorReleaseBranch')
			},
			// needs manual update before release freeze
			pushLocalPatchBranchToOrigin: {
				command: function() {
					var command = [
						'git push origin ' + grunt.config('minorReleaseBranch')
					].join(' && ')
					grunt.log.write(command);
					return command;
				}
			},
			pushTagToOrigin: {
				command: function() {
					var command = [
						'git push origin ' + packageVersion
					].join(' && ')
					grunt.log.write(command);
					return command;
				}
			},
			pushLocalMinorBranchToOriginMaster: {
				command: function() {
					var command = [
						'git push origin ' + grunt.config('majorReleaseBranch') + ':master'
					].join(' && ')
					grunt.log.write(command);
					return command;
				}
			},
			mergeLocalPatchBranchToHead: {
				command: function() {
					var command = [
						'git merge ' + grunt.config('minorReleaseBranch')
					].join(' && ')
					grunt.log.write(command);
					return command;
				}
			},
			// syncs local and origin branches
			pushLocalMasterToOriginMaster: {
				command: 'git push origin master'
			},
			// syncs local and origin branches
			pullOriginMasterToLocal: {
				command: [
					'git checkout master',
					'git pull origin master'
				].join(' && ')
			},
			upload: {
				command: function() {
					var command = [
						'mv dist ' + '<%= pkg.version %>',
						'scp -i ~/.ssh/fuelcdn -r "' + '<%= pkg.version %>' + '"/ ' + 
						'<%= cdnLoginFile.user %>' + '@' + '<%= cdnLoginFile.server %>' + ':' + '<%= cdnLoginFile.folder %>',
						'mv "' + '<%= pkg.version %>' + '" dist',
						'echo "Done uploading files."'
					].join(' && ')
					grunt.log.write(command);
					return command;
				}
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
	grunt.registerTask('make-icons', ['svgmin', 'copy:svgSources', 'grunticon:makeSvgIcons', 'string-replace']);
	grunt.registerTask('make-icons-base', ['copy:svgSources','grunticon:makeSvgIcons']);
	grunt.registerTask('glyphify-icons', ['string-replace']);

	/* -------------
		RELEASE
	------------- */
	// Maintainers: Run prior to a release. Includes SauceLabs VM tests.
	grunt.registerTask('release', 'Select tasks to release a new version', ['prompt:releaseTasks', 'release-tasks']);

	grunt.registerTask('release-tasks', function() {
		var task = grunt.config('releaseTask');

		grunt.config('banner', '<%= bannerRelease %>');

		if (task !== 'exit') {

			if (task === 'releaseNotes') {
				grunt.task.run(['notes']);
			}
			else if(task === 'patch' || task === 'minor' || task === 'major' || task === 'custom') {

				if (grunt.config('releaseTask') === 'patch') {
					grunt.task.run(['shell:checkoutPatchBranch']);
				}
				else if (grunt.config('releaseTask') === 'minor') {
					grunt.task.run(['shell:mergeLocalMasterAndMinorBranch']);	
				}

				grunt.task.run(['bump-only:' + grunt.config('releaseTask'), 'replace:readme', 'dist']);
			}
			else if(task === 'commit') {
				grunt.task.run(['shell:addReleaseFiles', 'shell:commit']);
			}
			else if(task === 'tag') {
				grunt.task.run(['shell:tag']);
			}
			else if(task === 'pushPatchBranchToOrigin') {
				grunt.task.run(['shell:pushLocalPatchBranchToOrigin', 'shell:pushTagToOrigin', 'shell:pullOriginMasterToLocal', 
			'shell:mergeLocalPatchBranchToHead', 'shell:pushLocalMasterToOriginMaster']);
			}
			else if(task === 'pushMinorBranchToOrigin') {
				grunt.task.run(['shell:pushLocalPatchBranchToOrigin', 'shell:pushTagToOrigin', 'shell:pushLocalPatchBranchToOriginMaster', 
				'shell:pullOriginMasterToLocal']);
			}
			else if(task === 'upload') {
				grunt.task.run(['shell:upload']);
			}

		}

	});

	grunt.registerTask('notes', 'Run a ruby gem that will request from Github unreleased pull requests', ['shell:notes']);

	/* -------------
			SERVE
		------------- */
	grunt.registerTask('servedev', ['distcssdev', 'connect:server', 'watch:dev', 'shell:syncDistWithMaster']);// This allows you to serve and watch files without overwriting the compiled css in the /dist/ directory.
	grunt.registerTask('serve', ['dist', 'connect:server', 'watch:full']);
};
