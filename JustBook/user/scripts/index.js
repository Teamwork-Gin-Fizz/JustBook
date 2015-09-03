(function () {
    'use strict';

    window.define = System.amdDefine;
    window.require = System.amdRequire;

    // Sammy depends on jQuery.
    // Sammy does not return a function object with SystemJS, but it does creates a global function object.
    System.import('jquery').then(function ($) {
        System.import('sammy').then(function () {
            System.import('user/scripts/templates').then(function (templates) {
                var $template = $('#template'),
                    app = Sammy('#template', function () {  //TODO: What '#template' does really do?
                    this.get('#/', function () {
                        templates.get('main-page').then(function (template) {
                            $template.html(template());
                        });
                    });

                    this.get('#/sign-in', function () {
                        templates.get('main-page-sign-in').then(function (template) {
                            $template.html(template());
                        });
                    });

                    this.get('#/sign-up', function () {
                        templates.get('main-page-sign-up').then(function (template) {
                            $template.html(template());
                        })
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