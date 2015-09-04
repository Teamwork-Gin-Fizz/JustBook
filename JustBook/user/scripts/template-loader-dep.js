define(['jquery'], function($){
    var $template = $('#template');

    function loadMainPage() {
        $template.load('templates/main-page.handlebars');
    }

    function loadSignInPage() {
        $template.load('templates/main-page-sign-in.handlebars');
    }

    function loadSignUpPage() {
        $template.load('templates/main-page-sign-up.handlebars');
    }

    function loadCustomPage(path){
        $template.load(path);
    }

    return {
        loadMainPage: loadMainPage,
        loadSignInPage: loadSignUpPage,
        loadSignUpPage: loadSignInPage,
        loadCustomPage: loadCustomPage
    };
});