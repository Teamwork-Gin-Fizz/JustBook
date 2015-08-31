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
	requirejs(['../template-loader'], function(templateLoader){
		templateLoader.loadMainPage();
	});
	
	requirejs(['../login']);
	
	requirejs(['../register']);
	
} ());