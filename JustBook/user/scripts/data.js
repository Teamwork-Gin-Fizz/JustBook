define('data', ['jquery', 'user/scripts/constants'], function ($, constants) {
    function signInUser(user) {
        var promise = new Promise(function (resolve, reject) {
            $.getJSON(
                constants.serverAddress + '?callback=?',
                'action=login&name=' +
                user.username +
                '&password=' + user.password,
                function (res) {
                    /*
                     Server returns:
                     Object { answer: "incorrect", reason: "username" } //when username is not in DB
                     Object { answer: "incorrect", reason: "password" } //when password is not that one from DB
                     Object { answer: "correct", hash: "12345678" } //when everything is OK
                     */
                    if (res.answer == 'correct') {
                        sessionStorage.setItem('userHash', res.hash);
                        //TODO: change to res.username when server is updated
                        sessionStorage.setItem('username', user.username);
                        resolve(res);
                    }
                    else {
                        reject(res);
                    }
                }
            );
        });

        return promise;
    }

    function signUpUser(user) {
        var promise = new Promise(function (resolve, reject) {
            $.getJSON(constants.serverAddress + '?callback=?',
                'action=register' +
                '&name=' + user.username +
                '&password=' + user.password +
                '&firstname=' + user.firstName +
                '&lastname=' + user.lastName +
                '&gender=' + user.gender +
                '&birthdate=' + user.birthDate,
                function (res) {
                    console.log(res);
                    if (res.answer === 'correct') {
                        sessionStorage.setItem('userHash', res.hash);
                        //TODO: change to res.username when server is updated
                        sessionStorage.setItem('username', user.username);
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }
            );
        });

        return promise;
    }

    function getAllUsernamesChat() {
        var promise = new Promise(function (resolve, reject) {
            $.getJSON(constants.serverAddress + '?callback=?',
                'action=chatUsers',
                function (res) {
                    if (res.answer === 'correct') {
                        var stringified = JSON.parse(res.list);
                        console.log(stringified);
                        resolve(stringified);
                    } else {
                        reject(res.answer);
                    }
                }
            );
        });

        return promise;
    }

    function getAllMessagesChat(userHash, correspondent) {
        var promise = new Promise(function (resolve, reject) {

            $.getJSON(constants.serverAddress + '?callback=?',
                'action=' + 'get' +
                '&to=' + correspondent +
                '&hash=' + userHash,
                function response(res) { //TODO: added name of the function, to make it testable
                    if (res.answer == 'incorrect') { // TODO: Answer to be incorrect is the common case
                        reject('refreshChatBox() returns res.answer "incorrect"');
                    } else {
                        var counter = 1;
                        var allData = res.messages.split(".//-||/.");
                        console.log(allData);
                        if (allData.length > counter) {
                            $("audio").trigger('play');
                            counter = allData.length;
                        }

                        resolve(JSON.parse(res.messages));
                    }
                });
        });

        return promise;
    }

    return {
        user: {
            signIn: signInUser,
            signUp: signUpUser
        },

        chat: {
            getAllUsernames: getAllUsernamesChat,
            getAllMessages: getAllMessagesChat
        }
    }
});