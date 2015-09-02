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

    function loadCustomPage(path, callback){
        $template.load(path);
        if (typeof callback === 'function'){
            callback();
        }
    }

    return {
        loadMainPage: loadMainPage,
        loadSignInPage: loadSignUpPage,
        loadSignUpPage: loadSignInPage,
        loadCustomPage: loadCustomPage
    };
});