window.define = System.amdDefine;
window.require = System.amdRequire;

require(['user/scripts/index'], function (controller) {
    controller.run('#/');
});