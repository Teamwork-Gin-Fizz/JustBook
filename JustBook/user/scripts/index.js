define('controller', ['user/scripts/templates', 'user/scripts/data', 'user/scripts/validator'], function (templates, data, validator) {
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

            this.get('#/home', function (context) {
                templates.get('user-home').then(function (template) {
                    var username = sessionStorage.getItem('username');
                    $template.html(template({username: username}));

                    var $signOutButton = $('#sign-out-button');
                    $signOutButton.on('click', function () {
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('userHash');

                        context.redirect('#/');
                    })
                });
            });

            this.get('#/home/chat', function () {

            });
        });


    return app;
});