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
                'action=get' +
                '&to=' + correspondent +
                '&hash=' + userHash,
                function response(res) { //TODO: added name of the function, to make it testable
                    if(res.messages === undefined){
                        res.messages = '[{}]';
                    }

                    resolve(JSON.parse(res.messages));
                }
            );
        });

        return promise;
    }

    function sendMessageChat(parsedMessage, correspondent, userHash){
        $.getJSON(constants.serverAddress + '?callback=?',
            'action=' + 'add' +
            '&message=' + parsedMessage +
            '&to=' + correspondent +
            '&hash=' + userHash
        );
    }

    return {
        user: {
            signIn: signInUser,
            signUp: signUpUser
        },

        chat: {
            getAllUsernames: getAllUsernamesChat,
            getAllMessages: getAllMessagesChat,
            sendMessage: sendMessageChat
        }
    }
});