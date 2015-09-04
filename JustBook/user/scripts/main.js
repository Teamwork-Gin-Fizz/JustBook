window.define = System.amdDefine;
window.require = System.amdRequire;

require(['user/scripts/main-controller'], function (mainController) {
    mainController.run('#/');
});