require(['jquery'], function ($) {
	var username = sessionStorage.getItem('username'),
		userhash = sessionStorage.getItem('userHash'),
		$template = $('#template');

	$('#username').html(sessionStorage.getItem('username'));

	$template.on('click', '#go-to-chat', ChatLoadLogic);
	$template.on('click', '#go-to-logout', Logout);

	function ChatLoadLogic() {
		require(['user/scripts/inner-template-loader'], function (templateLoader) {
			templateLoader.loadTemplate('#inner-content', 'templates/chat-main-page.handlebars');
		});
		require(['user/scripts/chat-logic']);
		$('#go-to-chat').hide();
	}
	
	function Logout(){ // TODO: How can set logout from the server?
		sessionStorage.setItem('username', '');
		sessionStorage.setItem('userHash', '');
		require(['user/scripts/template-loader'], function (templateLoader) {
            templateLoader.loadCustomPage('templates/main-page.handlebars');
        });
	}
});