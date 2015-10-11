'use strict';
var ValidationFunctions = function (model) {

    return {
        isEmpty: function (fieldId) {
            var field = model.data[fieldId];
            if (field === undefined || field === '' || field === null) {
                return true;
            } else {
                return false;
            }
        }

    };
};
module.exports = function (options) {
    return ValidationFunctions(options);
};