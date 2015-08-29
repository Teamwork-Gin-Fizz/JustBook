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
		var $templte = $('#template');

		$templte.load('templates/main-page-template.html');
	});
} ());