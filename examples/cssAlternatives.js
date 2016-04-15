define(function (require) {
	require('jquery');

	var useLightningRegEx = location.search.match(/[?&]lightning=(.*?)(?=&|$)/);
	if (useLightningRegEx && typeof(useLightningRegEx[1]) !== undefined) {
		var $linkTag = $('[href="../../dist/css/fuelux-mctheme.css"]');
		if ($linkTag) {
			$linkTag.attr('href', '../../node_modules/fuelux-minimal-lightning/dist/css/fuelux-minimal-lightning.css')
			console.log('Minimal Lightning CSS applied.');
		}

		$allLinks = $('a');
		$allLinks.each(function(index) {
			if ( $($allLinks[index]).attr('href') ) {
				$($allLinks[index]).attr('href', $($allLinks[index]).attr('href') + '?lightning=1') ;
			}

		});

	}

});