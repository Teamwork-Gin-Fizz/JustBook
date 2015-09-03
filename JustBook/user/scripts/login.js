require(['jquery', 'user/scripts/constants'], function ($, constants) {

    var $template = $('#template');

    $template.on('click', '#login-button', loginLogic);

    if (typeof(sessionStorage.getItem('userHash')) ==='string' && sessionStorage.getItem('userHash') != '') {
        LoadMain();
    }else{
        console.log('IF statement of sessionStorage item validation in login.js is not satisfied'); //TODO: Want to see if this is possible!
    }

    function LoadMain() {

        function first(){
            require(['user/scripts/template-loader'], function (templateLoader) {
                templateLoader.loadCustomPage('templates/user-home.handlebars', second);
            });
        }

        function second(){
            require(['user/scripts/home']);
        }

        first();
    }

    function loginLogic() {
        var chosenUsername = $('#sign-in-username').val(),
            chosenPassword = $('#sign-in-password').val();
            
        // TODO: If nevalid data -> display errors    
        if (chosenUsername != '' && chosenPassword != '') {
            $.getJSON(constants.serverAddress + '?callback=?', 'action=' + 'login&name=' + chosenUsername + '&password=' + chosenPassword, function (res) { // TODO: need explanation!
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
                else{
                    if(res.reason == 'username'){ //TODO: need some good styling :)
                        $('#error-message').html('Incorrect username!').css('text-align', 'center').css('font-weight', 'bold').css('color', 'red').fadeOut(3000);
                    }
                    if(res.reason == 'password'){ //TODO: need some good styling :)
                        $('#error-message').html('Incorrect password!').css('text-align', 'center').css('font-weight', 'bold').css('color', 'red').fadeOut(3000);
                    }
                }
            });
        }
    }
});