define(['jquery'], function ($) {
	var username = sessionStorage.getItem('username'),
		userhash = sessionStorage.getItem('userHash'),
		$template = $('#template'),
		serverIP = 'http://78.90.130.123/server.php';

	$.getJSON(serverIP +
		'?callback=?', 'action=' + 'chatUsers',
		function (res) {
			var allUsers = res.list.split(',');
			$.each(allUsers, function (key, value) {
				if(value !== ''){
					$('#users-for-chat')
						.append($("<option></option>")
							.attr("value", key)
							.text(value));
				}
			});
		});
});