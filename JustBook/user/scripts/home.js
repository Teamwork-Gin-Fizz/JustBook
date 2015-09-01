define(['jquery'], function ($) {
	var username = sessionStorage.getItem('username'),
		userhash = sessionStorage.getItem('userHash'),
		$template = $('#template');

	$('#username').html(sessionStorage.getItem('username'));
    //var $username = $('#username');
	//console.log($username.html());
	//$('#username').html('Baba Jaga');

	$template.on('click', '#go-to-chat', ChatLoadLogic);
	$template.on('click', '#go-to-logout', Logout);

	function ChatLoadLogic() {
		requirejs(['../inner-template-loader'], function (templateLoader) {
			templateLoader.loadTemplate('#inner-content', 'templates/chat-main-page.html');
		});
		requirejs(['../chat-logic']);
		$('#go-to-chat').hide();
	};
	
	function Logout(){
		sessionStorage.setItem('username', '');
		sessionStorage.setItem('userHash', '');
		requirejs(['../template-loader'], function (templateLoader) {
            templateLoader.loadCustomPage('templates/main-page-template.html');
        });
	};
});