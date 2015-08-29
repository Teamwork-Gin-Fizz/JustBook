(function () {
	'use strict';
	
	requirejs.config({
		baseUrl: 'scripts/libs',
		path:{
			'jquery': 'jquery',
			'Sammy': 'sammy',
			'bootstrap':'bootstrap'
		}
	});
	
	// Starting the app - to be implemented
	requirejs(['jquery'], function($){
		$('#template').html('sdfdfb');
	});
} ());