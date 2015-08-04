define(function (require) {
	require('bootstrap');
	require('jqtoc');

	$('#inputErrorTooltip1, #inputErrorTooltip2').tooltip({
		title: 'Required Field',
		placement: 'right',
		trigger: 'focus'
	}).tooltip('show');

	$('#toc').toc({'selectors': 'h1,h2'});
});
