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
                    System.import('user/scripts/validator').then(function (validator) {
                        var $template = $('#template'),
                            app = Sammy('#template', function () {
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
                                            },
                                                errorMessage = validator.validateUser(user),
                                                $errorMessage = $('#error-message').hide();
                                            
                                            if (errorMessage) {
                                                $errorMessage.html(errorMessage).fadeIn(1000).fadeOut(3000);
                                                return;
                                            }

                                            data.user.signIn(user).then(function () {
                                                context.redirect('#/home');
                                            }).catch(function (error) {
                                                $errorMessage.html('Incorrect ' + error.reason).fadeIn(1000).fadeOut(3000);
                                            });
                                        });
                                    });
                                });

                                this.get('#/sign-up', function (context) {
                                    templates.get('main-page-sign-up').then(function (template) {
                                        $template.html(template());

                                        var $signUpButton = $('#sign-up-button');
                                        $signUpButton.on('click', function () {
                                            var user = {
                                                    firstName: $('#sign-up-firstname').val(),
                                                    lastName: $('#sign-up-lastname').val(),
                                                    birthDate: $('#sign-up-birthdate').val(),
                                                    gender: $('#sign-up-gender').val(),
                                                    username: $('#sign-up-username').val(),
                                                    password: $('#sign-up-password').val()
                                                },
                                                errorMessage = validator.validateUser(user),
                                                $errorMessage = $('#error-message').hide();

                                            if (errorMessage) {
                                                $errorMessage.html(errorMessage).fadeIn(1000).fadeOut(3000);
                                                return;
                                            }
                                            
                                            data.user.signUp(user).then(function () {
                                                context.redirect('#/home');
                                            }).catch(function (error) {
                                                $errorMessage.html(error.reason).fadeIn(1000).fadeOut(3000);
                                            });
                                        });
                                    });
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
    });

//    require(['user/scripts/login']);

//    require(['user/scripts/register']);
}());