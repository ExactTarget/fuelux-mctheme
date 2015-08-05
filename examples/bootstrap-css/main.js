define(function (require) {
	require('bootstrap');

	$('body').scrollspy({
		target: '.scrollspy'
	});

	$('#inputErrorTooltip1, #inputErrorTooltip2').tooltip({
		title: 'Required Field',
		placement: 'right',
		trigger: 'focus'
	}).tooltip('show');
});
