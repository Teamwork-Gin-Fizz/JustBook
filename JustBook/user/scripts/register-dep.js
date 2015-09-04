require(['jquery', 'user/scripts/constants'], function ($, constants) {

    var $template = $('#template');

    $template.on('click', '#register-button', registerLogic);

    function registerLogic() {
        var firstName = $('#sign-up-firstname').val(),
            lastName = $('#sign-up-lastname').val(),
            birthDate = $('#sign-up-birthdate').val(),
            gender = $('#sign-up-gender').val(),
            chosenUsername = $('#sign-up-username').val(),
            chosenPassword = $('#sign-up-password').val();
            
        // TODO: If nevalid data -> display errors    
        if (chosenUsername != '' && chosenPassword != '') {
            $.getJSON(constants.serverAddress + '?callback=?',
                'action=' + 'register' +
                '&name=' + chosenUsername +
                '&password=' + chosenPassword +
                '&firstname=' + firstName +
                '&lastname=' + lastName +
                '&gender=' + gender +
                '&birthdate=' + birthDate,
                function (res) {
                    if (res.answer === 'correct') {
                        require(['inner-template-loader-dep'], function (templateLoader) {
                            templateLoader.loadTemplate('#inner-window', 'templates/signup-page-result-success.html');
                        });
                    } else {
                        require(['inner-template-loader-dep'], function (templateLoader) {
                            templateLoader.loadTemplate('#inner-window', 'templates/signup-page-result-fail.html');
                        });
                    }
                    clearForm();
                    console.log(res.answer);
                });
        }

        function clearForm() {
            firstName = $('#sign-up-firstname').val(''),
            lastName = $('#sign-up-lastname').val(''),
            birthDate = $('#sign-up-birthdate').val(''),
            gender = $('#sign-up-gender').val(''),
            chosenUsername = $('#sign-up-username').val(''),
            chosenPassword = $('#sign-up-password').val('');
        }
    }
});