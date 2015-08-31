define(['jquery'], function ($) {

    var $template = $('#template'),
        serverIP = 'http://78.90.130.123/server.php';

    $template.on('click', '#login-button', loginLogic);

    if (sessionStorage.getItem('userHash') != '') {
        LoadMain();
    }

    function LoadMain() {
        requirejs(['../template-loader'], function (templateLoader) {
            templateLoader.loadCustonPage('templates/main-page-home.html');
        });
        requirejs(['../home']);
    };

    function loginLogic() {
        var chosenUsername = $('#sign-in-username').val(),
            chosenPassword = $('#sign-in-password').val();
            
        // TODO: If nevalid data -> display errors    
        if (chosenUsername != '' && chosenPassword != '') {
            $.getJSON(serverIP + '?callback=?', 'action=' + 'login&name=' + chosenUsername + '&password=' + chosenPassword, function (res) {
                /*
                Server returns:
                Object { answer: "incorrect", reason: "username" } //when username is not in DB
                Object { answer: "incorrect", reason: "password" } //when password is not that one from DB
                Object { answer: "correct", hash: "12345678" } //when everything is OK
                */
                console.log(res);
                if (res.answer == 'correct') {
                    sessionStorage.setItem('userHash', res.hash);
                    sessionStorage.setItem('username', chosenUsername);
                    LoadMain();
                }
            });
        }

    }
});