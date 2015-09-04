define(['jquery'], function($){
    return {
        loadTemplate: function (where, templatePath) {
            var $template = $(where);
            $template.load(templatePath);
        }
    };
});