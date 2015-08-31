define(['jquery'], function ($) {
	var username = sessionStorage.getItem('username'),
		userhash = sessionStorage.getItem('userHash'),
		$template = $('#template');

	$('#username').html(sessionStorage.getItem('username'));

	$template.on('click', '#go-to-chat', ChatLoadLogic);

	function ChatLoadLogic() {
		requirejs(['../inner-template-loader'], function (templateLoader) {
			templateLoader.loadTemplate('#inner-content', 'templates/chat-main-page.html');
		});
	};
});