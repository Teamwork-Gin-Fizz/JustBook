define(['jquery'], function ($) {

    var $template = $('#template'),
        serverIP = 'http://78.90.130.123/server.php';
        
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
            $.getJSON(serverIP + '?callback=?', 
                'action=' + 'register'+ 
                '&name='+ chosenUsername + 
                '&password=' + chosenPassword +
                '&firstname=' + firstName +
                '&lastname=' + lastName +
                '&gender=' + gender + 
                '&birthdate=' + birthDate, 
                function (res) {
                /*
                Server returns:
                Object { answer: "incorrect", reason: "username" } //when username is not in DB
                Object { answer: "incorrect", reason: "password" } //when password is not that one from DB
                Object { answer: "correct", hash: "12345678" } //when everything is OK
                */
                console.log(res);
            });
        }
    }
});