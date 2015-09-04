define('data', ['jquery', 'user/scripts/constants'], function ($, constants) {
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

    function signInUser(user) {
        var promise = new Promise(function (resolve, reject) {
            $.getJSON(
                constants.serverAddress + '?callback=?',
                'action=login&name=' +
                user.username +
                '&password=' + user.password,
                function (res) {
                    /*
                     Server returns:
                     Object { answer: "incorrect", reason: "username" } //when username is not in DB
                     Object { answer: "incorrect", reason: "password" } //when password is not that one from DB
                     Object { answer: "correct", hash: "12345678" } //when everything is OK
                     */
                    if (res.answer == 'correct') {
                        sessionStorage.setItem('userHash', res.hash);
                        //TODO: change to res.username when server is updated
                        sessionStorage.setItem('username', user.username);
                        resolve(res);
                    }
                    else {
                        reject(res);
                    }
                }
            );
        });

        return promise;
    }

    //var $template = $('#template');
    //
    //$template.on('click', '#register-button', signUpUser);

    function signUpUser(user) {
        var promise = new Promise(function (resolve, reject) {
            $.getJSON(constants.serverAddress + '?callback=?',
                'action=register' +
                '&name=' + user.username +
                '&password=' + user.password +
                '&firstname=' + user.firstName +
                '&lastname=' + user.lastName +
                '&gender=' + user.gender +
                '&birthdate=' + user.birthDate,
                function (res) {
                    console.log(res);
                    if (res.answer === 'correct') {
                        //require(['user/scripts/inner-template-loader'], function (templateLoader) {
                        //    templateLoader.loadTemplate('#inner-window', 'templates/signup-page-result-success.html');
                        //});
                        sessionStorage.setItem('userHash', res.hash);
                        //TODO: change to res.username when server is updated
                        sessionStorage.setItem('username', user.username);
                        resolve(res);
                    } else {
                        //require(['user/scripts/inner-template-loader'], function (templateLoader) {
                        //    templateLoader.loadTemplate('#inner-window', 'templates/signup-page-result-fail.html');
                        //});
                        reject(res);
                    }
                    //clearForm();
                    //console.log(res.answer);
                }
            );

            //function clearForm() {
            //    firstName = $('#sign-up-firstname').val(''),
            //        lastName = $('#sign-up-lastname').val(''),
            //        birthDate = $('#sign-up-birthdate').val(''),
            //        gender = $('#sign-up-gender').val(''),
            //        chosenUsername = $('#sign-up-username').val(''),
            //        chosenPassword = $('#sign-up-password').val('');
            //}
        });

        return promise;
    }

    return {
        user: {
            signIn: signInUser,
            signUp: signUpUser
        },
    }
});