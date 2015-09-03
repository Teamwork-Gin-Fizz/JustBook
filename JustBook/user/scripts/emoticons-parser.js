define([], function () {
    var parser = (function(){
        function parseMessage(message){
            var parsedMessage = '',
                laughingEmoticon = '<img src="../server/media/emoticons/laughing.png"/>';

            for (var i = 0; i < message.length; i++){
                if (message[i] === ':' && (message[i + 1] === 'D' || message[i + 1] === 'd')) {
                    parsedMessage += laughingEmoticon;
                    i += 1;
                } else {
                    parsedMessage += message[i];
                }
            }

            return parsedMessage;
        }


        return {
            parseMessage: parseMessage
        };
    }());

    return parser;
});