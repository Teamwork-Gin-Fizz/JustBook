define('mainController', ['user/scripts/templates', 'user/scripts/data', 'user/scripts/validator'], function (templates, data, validator) {
    var $template = $('#template'),
        app = Sammy('#template', function () {
            this.get('#/', function (context) {
                if (sessionStorage.getItem('userHash')) {
                    context.redirect('#/home');
                    return;
                }

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

                    var $goToChatButton = $('#go-to-chat-button');
                    $goToChatButton.on('click', function () {
                        context.redirect('#/home/chat');
                    });

                    var $signOutButton = $('#sign-out-button');
                    $signOutButton.on('click', function () {
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('userHash');

                        context.redirect('#/');
                    })
                });
            });

            this.get('#/home/chat', function (context) {
                if (sessionStorage.getItem('userHash')) {
                    templates.get('chat-main-page').then(function (template) {
                        data.chat.getAllUsernames().then(function (usernames) {
                            var $innerContent = $('#inner-content');
                            $innerContent.html(template(usernames));

                            var $selectedElement = $('#users-for-chat');
                            $selectedElement.on('change', function () {
                                var correspondent = $selectedElement.val();
                                if (sessionStorage.getItem('username') === correspondent ||
                                    correspondent === 'Choose:') {
                                    return;
                                }

                                context.redirect('#/home/chat/' + correspondent);
                            });
                        });
                    });
                }
            });

            this.get('#/home/chat/:name', function (context) {
                var correspondent = context.params.name,
                    userHash = sessionStorage.getItem('userHash'),
                    currentHref = location.href;

                templates.get('chat-selected-user').then(function (template) {
                    var $chatWindow = $('#chat-window');
                    $chatWindow.html(template());
                }).then(function () {
                    var intervalID,
                        $chatZone = $('#chat-zone'),
                        $message = $('#message'),
                        $sendButton = $('#send-button');

                    function writeMessages() {
                        if (location.href !== currentHref) {
                            clearInterval(intervalID);
                            return;
                        }

                        templates.get('chat-selected-user-messages').then(function (template) {
                            data.chat.getAllMessages(userHash, correspondent).then(function (allMessages) {
                                $chatZone.html(template(allMessages));

                                $chatZone.scrollTop($chatZone.prop('scrollHeight'));
                            });
                        });
                    }

                    intervalID = setInterval(writeMessages, 1000);

                    $message.keydown(function (ev) {
                        if (ev.which !== 13 || ev.shiftKey) {
                            return;
                        }

                        if (validator.isEmptyStringOrWhiteSpace($message.val())) {
                            return;
                        }

                        data.chat.sendMessage($message.val(), correspondent, userHash);
                        $message.val('');
                    });

                    $sendButton.on('click', function () {
                        var ev = $.Event('keydown', {which: 13});
                        $message.trigger(ev);
                    });
                });
            });
        });

    return app;
});