define(function (require) {
	require('bootstrap');

	setTimeout(function(){
		$('body').scrollspy({
			target: '.scrollspy'
		});
	});

	/*$('#inputErrorTooltip1, #inputErrorTooltip2').tooltip({
		title: 'Required Field',
		placement: 'right',
		trigger: 'focus'
	}).tooltip('show');*/

});
