define('validator', [], function () {
    function isNullOrUndefined(obj) {
        return obj == undefined;
    }

    function isEmptyStringOrWhiteSpace(str) {
        return /^\s*$/.test(str);
    }

    return {
        isNullOrUndefined: isNullOrUndefined,
        isEmptyStringOrWhiteSpace: isEmptyStringOrWhiteSpace
    }
});