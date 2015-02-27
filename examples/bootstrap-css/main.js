define(function (require) {
	require('bootstrap');

	$('#inputErrorTooltip1, #inputErrorTooltip2').tooltip({
		title: 'Required Field',
		placement: 'right',
		trigger: 'focus'
	}).tooltip('show');
});
