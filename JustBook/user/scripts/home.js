define(['jquery'], function ($) {
	var username = sessionStorage.getItem('username'),
		userhash = sessionStorage.getItem('userHash'),
		$template = $('#template');

	$('#username').html(sessionStorage.getItem('username'));

	$template.on('click', '#go-to-chat', ChatLoadLogic);
	$template.on('click', '#go-to-logout', Logout);

	function ChatLoadLogic() {
		requirejs(['../inner-template-loader'], function (templateLoader) {
			templateLoader.loadTemplate('#inner-content', 'templates/chat-main-page.html');
		});
		requirejs(['../chat-logic']);
	};
	
	function Logout(){
		sessionStorage.setItem('username', '');
		sessionStorage.setItem('userHash', '');
		requirejs(['../template-loader'], function (templateLoader) {
            templateLoader.loadCustonPage('templates/main-page-template.html');
        });
	};
});