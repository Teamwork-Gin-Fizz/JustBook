/*(function () {
    describe('#refreshChatBox function test suit', function () {
        it('when response.answer is "incorrect" expect to return Error message', function () {
            var res = {
                answer: 'incorrect'
            };
            var actual = refreshChatBox(response(res));
            var expected = 'refreshChatBox() returns res.answer "incorrect"';
            expect(actual).to.equal(expected);
        });
        it('when response.answer is "neshto drugo" expect to NOT return Error message', function () {
            var res = {
                answer: 'neshto drugo'
            };
            var actual = refreshChatBox(response(res));
            var expected = 'refreshChatBox() returns res.answer "incorrect"';
            expect(actual).to.equal(expected);
        });
    });
}());*/

define(['../chat-logic'], function (chatLogic) {
    console.log('I am in define of the tests');

    describe('#refreshChatBox function test suit', function () {
        it('when response.answer is "incorrect" expect to return Error message', function () {
            var res = {
                answer: 'incorrect'
            };
            var actual = chatLogic.refreshChatBox(response(res));
            var expected = 'refreshChatBox() returns res.answer "incorrect"';
            expect(actual).to.equal(expected);
        });
        it('when response.answer is "neshto drugo" expect to NOT return Error message', function () {
            var res = {
                answer: 'neshto drugo'
            };
            var actual = chatLogic.refreshChatBox(response(res));
            var expected = 'refreshChatBox() returns res.answer "incorrect"';
            expect(actual).to.equal(expected);
        });
    });
});
