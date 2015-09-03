(function () {
    'use strict';

    window.define = System.amdDefine;
    window.require = System.amdRequire;

    // Sammy depends on jQuery.
    // Sammy does not return a function object with SystemJS, but it does creates a global function object.
    System.import('jquery').then(function ($) {
        System.import('sammy').then(function () {
            System.import('user/scripts/templates').then(function (templates) {
                System.import('user/scripts/data').then(function (data) {
                    var $template = $('#template'),
                        app = Sammy('#template', function () {  //TODO: What '#template' does really do?
                            this.get('#/', function () {
                                templates.get('main-page').then(function (template) {
                                    $template.html(template());
                                });
                            });

                            this.get('#/sign-in', function (context) {
                                templates.get('main-page-sign-in').then(function (template) {
                                    $template.html(template());

                                    var $signInButton = $('#sign-in-button');
                                    $signInButton.on('click', function () {
                                        var user = {
                                            username: $('#sign-in-username').val(),
                                            password: $('#sign-in-password').val()
                                        };

                                        data.user.signIn(user).then(function () {
                                            context.redirect('#/home');
                                        }).catch(function (error) {
                                            $('#error-message').html('Incorrect ' + error.reason);
                                        });
                                    });
                                });
                            });

                            this.get('#/sign-up', function () {
                                templates.get('main-page-sign-up').then(function (template) {
                                    $template.html(template());
                                })
                            });

                            this.get('#/home', function () {
                                templates.get('user-home').then(function(template) {
                                    var username = sessionStorage.getItem('username');
                                    $template.html(template({username: username}));
                                });
                            });

                            this.get('#/home/chat', function () {

                            });
                        });

                    app.run('#/');
                });
            });
        });
    });

//    require(['user/scripts/login']);

//    require(['user/scripts/register']);
}());