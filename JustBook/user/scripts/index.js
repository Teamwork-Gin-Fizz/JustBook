(function () {
    'use strict';

    window.define = System.amdDefine;
    window.require = System.amdRequire;

    // Sammy depends on jQuery.
    // Sammy does not return a function object with SystemJS, but it does creates a global function object.
    System.import('jquery').then(function () {
        System.import('sammy').then(function () {
            System.import('user/scripts/inner-template-loader').then(function (templateLoader) {
                var app = window.Sammy('#template', function () {  //TODO: What '#template' does really do?
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
        });
    });

    require(['user/scripts/login']);

    require(['user/scripts/register']);
}());