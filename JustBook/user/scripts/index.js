(function () {
	'use strict';
	
	requirejs.config({
		baseUrl: 'scripts/libs',
		path:{
			'jquery': 'jquery',
			'sammy': 'sammy',
			'bootstrap':'bootstrap'
		}
	});

	requirejs(['jquery', 'sammy', '../inner-template-loader'], function ($, sammy, templateLoader) {
	    var app = sammy('#template', function () {
	        this.get('#/', function () {
	            templateLoader.loadTemplate('#template', 'templates/main-page-template.html');
	        });

			this.get('#/sign-in', function () {
				templateLoader.loadTemplate('#template', 'templates/main-page-signin-template.html');
			});

			this.get('#/sign-up', function () {
				templateLoader.loadTemplate('#template', 'templates/main-page-signup-template.html');
			});

			this.get('#/home', function () {
			    
			});

			this.get('#/home/chat', function () {

			});
	    });

		app.run('#/');
	});

	// Starting the app - to be implemented
	//requirejs(['../template-loader'], function(templateLoader){
	//	templateLoader.loadMainPage();
	//});
	
	requirejs(['../login']);
	
	requirejs(['../register']);
	
} ());