define(['jquery', '../scripts/constants'], function ($, constants) {
    console.log('I am in chat-logic.js');
	var username = sessionStorage.getItem('username'),
		userhash = sessionStorage.getItem('userHash'),
		$template = $('#template'),
		correspondent;

	$.getJSON(constants.serverAddress +
		'?callback=?', 'action=' + 'chatUsers',
		function (res) {
			$('#users-for-chat')
						.append($("<option></option>")
							.text('Choose'));
            //var listOfUsers = res.list;
            //console.log(listOfUsers);
			var allUsers = res.list.split(',');
            //console.log(allUsers);
			$.each(allUsers, function (key, value) {
				if (value !== '' && value != username) {
					$('#users-for-chat')
						.append($("<option></option>")
							.attr("value", key)
							.text(value));
				}
			});
		});

	$template.on('change', 'select', function () {
		correspondent = $("select option:selected").text();
		//sessionStorage.setItem('correspondent', correspondent);
		requirejs(['../inner-template-loader'], function (templateLoader) {
			templateLoader.loadTemplate('#chat-window', 'templates/chat-selected-user.html');
		});
	});

	function saveChatComment() {
		console.log('kakto trea e');
		var $msgCommentBox = $('#msg');
        var $message = $msgCommentBox.val();
        if ($message != '') {
			$.getJSON(constants.serverAddress + '?callback=?',
				'action=' + 'add' +
				'&message=' + $message +
				'&to=' + correspondent +
				'&hash=' + userhash);
        }
        $msgCommentBox.val('');
        refreshChatBox();
	};

	$template.on('click', '#send', function () {
        saveChatComment();
	});

	$(document).keypress(function (e) {
		if (e.which == 13) {
			saveChatComment();
		}
	});

	function refreshChatBox() {
        console.log('I am in the refreshChatBox()');
		var theHtml = '';
		$.getJSON(constants.serverAddress + '?callback=?',
			'action=' + 'get' +
			'&to=' + correspondent +
			'&hash=' + userhash,
			function response(res) { //TODO: added name of the function, to make it testable
                if(res.answer == 'incorrect'){ // TODO: Answer to be incorrect is the common case
                    return ('refreshChatBox() returns res.answer "incorrect"');
                }else{
                    var allData = res.messages.split(".//-||/.");
                    $.each(allData, function (index, value) {
                        if (value !== '') {
                            theHtml += "<div class='col-md-12'>";
                            theHtml += value;
                            theHtml += '</div>';
                        }
                    });
                    $('#chatZone').html(theHtml);
                }
			});
	}
	setInterval(refreshChatBox, 1000);

	function refreshScroll(){
        var $chatZone = $('#chatZone');
        if($chatZone.length != 0){
            $chatZone.scrollTop($chatZone[0].scrollHeight);
        }
        else{
            return ('refreshScroll() returns this message because chatZone does not contain anything! Type something!');
        }
	}

	if($('#chatZone')){
	    setInterval(refreshScroll, 3000);
	}
});