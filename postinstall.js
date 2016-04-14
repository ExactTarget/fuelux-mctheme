var npm = require('npm');

if (process.env.INSTALL_FUELUX_MCTHEME_BOWER === 'true') {
	 require("bower").commands.install();
}
