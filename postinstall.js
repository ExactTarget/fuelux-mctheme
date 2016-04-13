var npm = require('npm');

if (process.env.INSTALL_FUELUX_MCTHEME_BOWER === 'true') {
	 require("bower").commands.install();
}

if (process.env.INSTALL_FUELUX_MINIMAL_LIGHTNING === 'true') {
	npm.load(function(err) {
		// install module ffi
		npm.commands.install(['git+ssh://git@github.com/exacttarget/fuelux-minimal-lightning.git'], function(er, data) {

		});

		npm.on('log', function(message) {
			// log installation progress
			console.log(message);
		});
	});
}