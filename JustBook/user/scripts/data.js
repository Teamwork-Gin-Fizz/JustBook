define('data', ['jquery', 'user/scripts/constants', 'user/scripts/validator'], function ($, constants, validator) {
    //if (typeof(sessionStorage.getItem('userHash')) === 'string' && sessionStorage.getItem('userHash') != '') {
    //    LoadMain();
    //}

    //function LoadMain() {
    //    require(['user/scripts/template-loader'], function (templateLoader) {
    //        templateLoader.loadCustomPage('templates/user-home.handlebars');
    //    });
    //
    //    require(['user/scripts/home']);
    //}

    function userSignIn(user) {
        var promise = new Promise(function (resolve, reject) {
            // TODO: this if must go in the controller
            //if (!(validator.isEmptyStringOrWhiteSpace(user.username) ||
            //    validator.isEmptyStringOrWhiteSpace(user.password))) {
                $.getJSON(
                    constants.serverAddress + '?callback=?',
                    'action=login&name=' + user.username + '&password=' + user.password,
                    function (res) {
                        /*
                         Server returns:
                         Object { answer: "incorrect", reason: "username" } //when username is not in DB
                         Object { answer: "incorrect", reason: "password" } //when password is not that one from DB
                         Object { answer: "correct", hash: "12345678" } //when everything is OK
                         */
                        if (res.answer == 'correct') {
                            sessionStorage.setItem('userHash', res.hash);
                            sessionStorage.setItem('username', user.username);
                            resolve(res);
                        }
                        else {
                            reject(res);

                            //TODO: move out
                            //if (res.reason == 'username') { //TODO: need some good styling :)
                            //    $('#error-message').html('Incorrect username!').css('text-align', 'center').css('font-weight', 'bold').css('color', 'red').fadeOut(3000);
                            //}
                            //if (res.reason == 'password') { //TODO: need some good styling :)
                            //    $('#error-message').html('Incorrect password!').css('text-align', 'center').css('font-weight', 'bold').css('color', 'red').fadeOut(3000);
                            //}
                        }
                    }
                );
            //}
        });

        return promise;
    }

    return {
        user:{
            signIn: userSignIn
        },
    }
});