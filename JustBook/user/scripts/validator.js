define('validator', [], function () {
    function isNullOrUndefined(obj) {
        return obj == undefined;
    }

    function isEmptyStringOrWhiteSpace(str) {
        return /^\s*$/.test(str);
    }
    
    function validateUser(user) {
        if (isEmptyStringOrWhiteSpace(user.username)) {
            return 'Please, fill in a username!';
        }
        
        if (isEmptyStringOrWhiteSpace(user.password)) {
            return 'Please, fill in your password!';
        }
        
        if (user.firstName && isEmptyStringOrWhiteSpace(user.firstName)) {
            return 'Please, fill in your first name!';
        }
        
        if (user.lastName && isEmptyStringOrWhiteSpace(user.lastName)) {
            return 'Please, fill in your last name!';
        }
        
        if (user.birthDate && isEmptyStringOrWhiteSpace(user.birthDate)) {
            return 'Please, fill in your birth date';
        }

        if (user.gender && isEmptyStringOrWhiteSpace(user.gender)) {
            return 'Please, choose a gender!';
        }

        return null;
    }

    return {
        isNullOrUndefined: isNullOrUndefined,
        isEmptyStringOrWhiteSpace: isEmptyStringOrWhiteSpace,
        validateUser: validateUser
    }
});