define(['jquery'], function($){
    var $template = $('#template');

    function loadMainPage() {
        $template.load('templates/main-page-template.html');
    }

    function loadSignInPage() {
        $template.load('templates/main-page-signin-template.html');
    }

    function loadSignUpPage() {
        $template.load('templates/main-page-signup-template.html');
    }

    $template.on('click', '#sign-in', loadSignInPage);
    $template.on('click', '#sign-up', loadSignUpPage);
    $template.on('click', '#go-back', loadMainPage);

    return {
        loadMainPage: loadMainPage,
        loadSignInPage: function () {
            $template.load('templates/main-page-signin-template.html');
        },
        loadSignUpPage: function () {
            $template.load('templates/main-page-signup-template.html');
        }
    };
});