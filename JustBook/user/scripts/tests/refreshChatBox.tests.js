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

// I guess mocha and chai should be required here for the tests

window.define = System.amdDefine;
window.require = System.amdRequire;

/*require(['user/scripts/chat-logic'], function (chatLogic) {
    console.log('I am in define of the tests');

    describe('#refreshChatBox function test suit', function () {
        it('when response.answer is "incorrect" expect to return Error message', function () {
            var res = {
                answer: 'incorrect'
            };
            var actual = chatLogic.refreshChatBox.response(res);
            var expected = 'refreshChatBox() returns res.answer "incorrect"';
            expect(actual).to.equal(expected);
        });
        /!*it('when response.answer is "neshto drugo" expect to NOT return Error message', function () {
            var res = {
                answer: 'neshto drugo'
            };
            var actual = chatLogic.refreshChatBox(response(res));
            var expected = 'refreshChatBox() returns res.answer "incorrect"';
            expect(actual).to.equal(expected);
        });*!/
    });
});*/

require(['user/scripts/chat-logic'], function (chatLogic) {
    console.log('I am in define of the tests');

    var func = chatLogic.sum;
    console.log(func);


    describe('Proba SUM', function () {
        it('testvam sum', function () {
            console.log(func);
            var actual = sum(2,3);
            var expected = 5;
            expect(actual).to.equal(expected);
        });
        /*it('when response.answer is "neshto drugo" expect to NOT return Error message', function () {
         var res = {
         answer: 'neshto drugo'
         };
         var actual = chatLogic.refreshChatBox(response(res));
         var expected = 'refreshChatBox() returns res.answer "incorrect"';
         expect(actual).to.equal(expected);
         });*/
    });
});