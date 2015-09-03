define([], function () {
    var parser = (function(){
        function parseMessage(message){
            var parsedMessage = '',
                laughingEmoticon = '<img src="../server/media/emoticons/laughing.png"/>',
                likeEmoticon = '<img src="../server/media/emoticons/like.png"/>',
                sadEmoticon = '<img src="../server/media/emoticons/sad.png"/>',
                smileEmoticon = '<img src="../server/media/emoticons/smile.png"/>',
                winkEmoticon = '<img src="../server/media/emoticons/wink.png"/>',
                dislikeEmoticon = '<img src="../server/media/emoticons/dislike.png"/>',
                awesomeEmoticon = '<img src="../server/media/emoticons/awesome.png"/>'
                poopEmoticon = '<img src="../server/media/emoticons/poop.png"/>',
                tongueEmoticon = '<img src="../server/media/emoticons/tongue.png"/>',
                wtfEmoticon = '<img src="../server/media/emoticons/wtf.png"/>',
                kissEmoticon = '<img src="../server/media/emoticons/kiss.png"/>';


            for (var i = 0; i < message.length; i++){
                if (message[i] === ':' && (message[i + 1] === 'D' || message[i + 1] === 'd')) {
                    parsedMessage += laughingEmoticon;
                    i += 1;
                } else if (message[i] === ':' && message[i + 1] === ')') {
                    parsedMessage += smileEmoticon;
                    i += 1;
                } else if (message[i] === ':' && message[i + 1] === '(') {
                    parsedMessage += sadEmoticon;
                    i += 1;
                } else if (message[i] === ';' && message[i + 1] === ')') {
                    parsedMessage += winkEmoticon;
                    i += 1;
                } else if (message[i] === '(' && (message[i + 1] === 'y' || message[i + 1] === 'Y') && message[i + 2] === ')') {
                    parsedMessage += likeEmoticon;
                    i += 2;
                } else if (message[i] === '(' && (message[i + 1] === 'n' || message[i + 1] === 'N') && message[i + 2] === ')') {
                    parsedMessage += dislikeEmoticon;
                    i += 2;
                } else if (message[i] === ':' && message[i + 1] === '3'){
                    parsedMessage += awesomeEmoticon;
                    i += 1;
                } else if (message[i] === ':' && message[i + 1] === '*'){
                    parsedMessage += kissEmoticon;
                    i += 1;
                }  else if (message[i] === 'o' && message[i + 1] === '.' && message[i + 2] === 'O'){
                    parsedMessage += wtfEmoticon;
                    i += 2;
                } else if (message[i] === ':' && message[i + 4] === 'p' && message[i + 5] === ':'){
                    parsedMessage += poopEmoticon;
                    i += 5;
                } else if (message[i] === ':' && (message[i + 1] === 'P' || message[i + 1] === 'p')){
                    parsedMessage += tongueEmoticon;
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