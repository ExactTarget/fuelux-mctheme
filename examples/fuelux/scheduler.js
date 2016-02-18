define(function(require) {
	var data = require('data');
	var jquery = require('jquery');
	var hbs = require('hbs');
	var log = function(){
		if(window.console && window.console.log){
			var args = Array.prototype.slice.call(arguments);
			window.console.log.apply(console, args);
		}
	};

	require('fuelux');


	//SCHEDULER
	var scheduler = require('hbs!fuelux_templates/scheduler');
	$($('#scheduler .thin-box')[0]).html(scheduler()).scheduler();

	$('#myScheduler').on('changed.fu.scheduler', function(){
		log('scheduler changed.fu.scheduler: ', arguments);
	});

	$('#btnSchedulerEnable').on('click', function(){
		$('#myScheduler').scheduler('enable');
	});
	$('#btnSchedulerDisable').on('click', function(){
		$('#myScheduler').scheduler('disable');
	});
	$('#btnSchedulerLogValue').on('click', function(){
		var val = $('#myScheduler').scheduler('value');
		log(val);
	});
	$('#btnSchedulerSetValue').on('click', function(){
		var newVal = {
			"startDateTime": "2014-03-31T03:23+02:00",
			"timeZone": {
				"name": "Namibia Standard Time",
				"offset": "+02:00"
			},
			"recurrencePattern": "FREQ=MONTHLY;INTERVAL=6;BYDAY=WE;BYSETPOS=3;UNTIL=20140919;"
		};
		log(newVal);
		$('#myScheduler').scheduler('value', newVal);
	});

	$('#btnSchedulerDestroy').on('click', function() {
		var $cont = $('#myScheduler').parent();
		var markup = $('#myScheduler').scheduler('destroy');
		log(markup);
		$cont.append(markup);
		$('#myScheduler').scheduler();
	});
});